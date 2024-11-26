using backend.DataModels;
using backend.DbContext;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using System.Security.Claims;
using System.IdentityModel.Tokens.Jwt;
using System.Text;
using System.Diagnostics;

var builder = WebApplication.CreateBuilder(args);

// Configure CORS to allow requests from specific origins
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowAllOrigins",
    builder =>
    {
        builder.WithOrigins("localhost:3000")
        .AllowCredentials()
        .AllowAnyHeader()
        .SetIsOriginAllowed((host) => true)
        .AllowAnyMethod();
    });
});

// Add services to the container
builder.Services.AddDbContext<FitnessContext>(options =>
{
    options.UseSqlite("Data Source=fitness.db");
});


// JWT Authentication
builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
    .AddJwtBearer(options =>
    {
        options.TokenValidationParameters = new TokenValidationParameters
        {
            ValidateIssuer = true,
            ValidateAudience = true,
            ValidateLifetime = true,
            ValidIssuer = builder.Configuration["Jwt:Issuer"],
            ValidAudience = builder.Configuration["Jwt:Audience"],
            IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(builder.Configuration["Jwt:Key"]))
        };
    });

builder.Services.AddAuthorization();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseCors("AllowAllOrigins");
app.UseHttpsRedirection();


// Add Authentication and Authorization
app.UseAuthentication();
app.UseAuthorization();

// User registration and login endpoints
app.MapPost("/register", (PublicUser user, FitnessContext dbContext) =>
{
    // Check if user already exists
    if (dbContext.Users.Any(u => u.UserName == user.UserName))
    {
        return Results.BadRequest("User already exists.");
    }
    // Register the user 
    dbContext.Users.Add(user.GetPrivateUser());
    dbContext.SaveChanges();
    return Results.Ok("User registered successfully.");
}).WithName("Create New User").WithOpenApi();

app.MapPost("/login", (PublicUser loginUser, FitnessContext dbContext) =>
{
    var user = dbContext.Users.FirstOrDefault(u => u.UserName == loginUser.UserName);
    if (user != null)
    {
        var storedPassword = dbContext.Users
                           .Where(u => u.UserName == loginUser.UserName)
                           .Select(u => u.Password)
                           .FirstOrDefault();
        if (!PrivateUser.VerifyPassword(loginUser.Password, storedPassword)) // Verify hashed password
        {
            return Results.Unauthorized();
        }
    }
    else // User not found
    {
        return Results.NotFound("User not found.");
    }

    // Create JWT token if credentials are valid
    var token = GenerateJwtToken(user.UserName);
    return Results.Ok(new { Token = token });
}).WithName("Login User").WithOpenApi();


// Get workouts for a particular user
app.MapGet("/workouts", (HttpContext httpContext, FitnessContext dbContext) =>
{
    var loggedInUserId = GetLoggedInUserId(httpContext, dbContext);

    if (loggedInUserId < 0)
    {
        return Results.Unauthorized();
    }

    var workouts = dbContext.Workouts
        .Where(w => w.UserId == loggedInUserId)
        .Include(w => w.Exercises)
        .OrderByDescending(w => w.Date)
        .ToList();

    return Results.Ok(workouts);
});

// Add a new workout
app.MapPost("/addworkout", (Workout newWorkout, HttpContext httpContext, FitnessContext dbContext) =>
{
    var loggedInUserId = GetLoggedInUserId(httpContext, dbContext);

    if (loggedInUserId < 0)
    {
        return Results.Unauthorized();
    }

    // if (newWorkout.Exercises == null || newWorkout.Exercises.Count == 0)
    // {
    //     return Results.BadRequest("A workout must include at least one exercise.");
    // }

    newWorkout.UserId = loggedInUserId;
    var user = dbContext.Users.FirstOrDefault(u => u.UserId == newWorkout.UserId);
    // newWorkout.User = user;
    dbContext.Workouts.Add(newWorkout);
    dbContext.SaveChanges();

    return Results.Ok(newWorkout);
}).WithName("Create New Workout").WithOpenApi();

// Add an exercise to a workout for a particular user
app.MapPost("/addexercise", (Exercise newExercise, int workoutId, HttpContext httpContext, FitnessContext dbContext) =>
{
    var loggedInUserId = GetLoggedInUserId(httpContext, dbContext);

    if (loggedInUserId < 0)
    {
        return Results.Unauthorized();
    }

    var workout = dbContext.Workouts
        .Include(w => w.Exercises)
        .FirstOrDefault(w => w.WorkoutId == workoutId && w.UserId == loggedInUserId);

    if (workout == null)
    {
        return Results.NotFound();
    }

    newExercise.WorkoutId = workoutId;

    // // Assign ExerciseId based on the number of exercises in the workout
    // newExercise.ExerciseId = workout.Exercises.Count > 0 ? workout.Exercises.Count + 1 : 1;

    workout.Exercises.Add(newExercise);
    dbContext.SaveChanges();

    return Results.Ok(newExercise);
}).WithName("Add Exercise to Workout").WithOpenApi();

// Edit a workout for a particular user
app.MapPut("/editworkout", (Workout updatedWorkout, int workoutId, HttpContext httpContext, FitnessContext dbContext) =>
{
    var loggedInUserId = GetLoggedInUserId(httpContext, dbContext);

    if (loggedInUserId < 0)
    {
        return Results.Unauthorized();
    }

    var workout = dbContext.Workouts
        .Include(w => w.Exercises)
        .FirstOrDefault(w => w.WorkoutId == workoutId && w.UserId == loggedInUserId);

    if (workout == null)
    {
        return Results.NotFound();
    }

    workout.Name = updatedWorkout.Name;
    workout.Date = updatedWorkout.Date;

    dbContext.SaveChanges();

    return Results.Ok(workout);
}).WithName("Edit Workout").WithOpenApi();


// Edit an exercise in a workout for a particular user
app.MapPut("/editexercise", (Exercise updatedExercise, int workoutId, int exerciseId, HttpContext httpContext, FitnessContext dbContext) =>
{
    var loggedInUserId = GetLoggedInUserId(httpContext, dbContext);

    if (loggedInUserId < 0)
    {
        return Results.Unauthorized();
    }

    var workout = dbContext.Workouts
        .Include(w => w.Exercises)
        .FirstOrDefault(w => w.WorkoutId == workoutId && w.UserId == loggedInUserId);

    if (workout == null)
    {
        return Results.NotFound();
    }

    Exercise exercise; // Exercise to be updated

    exercise = workout.Exercises.First(e => e.ExerciseId == exerciseId);

    exercise.Name = updatedExercise.Name;
    exercise.Sets = updatedExercise.Sets;
    exercise.Repetitions = updatedExercise.Repetitions;
    exercise.Weight = updatedExercise.Weight;

    dbContext.SaveChanges();

    return Results.Ok(exercise);
}).WithName("Edit Exercise in Workout").WithOpenApi();



app.Run();


// Helper methods for token generation
string GenerateJwtToken(string username)
{
    var claims = new[]
    {
        new Claim("username", username)
    };

    var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(builder.Configuration["Jwt:Key"]));
    var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

    var token = new JwtSecurityToken(
        issuer: builder.Configuration["Jwt:Issuer"],
        audience: builder.Configuration["Jwt:Audience"],
        claims: claims,
        expires: DateTime.Now.AddHours(1),
        signingCredentials: creds
    );

    return new JwtSecurityTokenHandler().WriteToken(token);
}

// Helper method to get the logged-in user's ID
int GetLoggedInUserId(HttpContext httpContext, FitnessContext dbContext)
{
    var usernameClaim = httpContext.User.Claims.FirstOrDefault(c => c.Type == "username");
    if (usernameClaim == null)
    {
        return -1;
    }
    // return user ID from database where username from claim matches the username in the database
    var username = usernameClaim.Value;
    var userId = dbContext.Users
        .Where(u => u.UserName == username)
        .Select(u => u.UserId)
        .FirstOrDefault();
    return userId;

}
