[![Review Assignment Due Date](https://classroom.github.com/assets/deadline-readme-button-22041afd0340ce965d47ae6ef1cefeee28c7c493a6346c4f15d667ab976d596c.svg)](https://classroom.github.com/a/e8CdihvW)
[![Open in Codespaces](https://classroom.github.com/assets/launch-codespace-2972f46106e565e64193e422d61a12cf1da4916b45550586e14ef0a7c637dd04.svg)](https://classroom.github.com/open-in-codespaces?assignment_repo_id=16993180)
# csc436_FinalProject

## LIVE URL LINK
https://20241118t182139-dot-fitnesstrackerwebapp.uc.r.appspot.com/login

## Documentation

i. Describe each of the requirements and how your project meets them

For my project, I have implemented the frontend using React-Bootstrap. This React app is structured with multiple components to handle user registration, login, displaying and editing the user's history of workout and exercise data, and adding workouts and exercises.

The backend of my app is built using ASP.NET Core. The API supports GET, POST, and PUT operations, enabling the app to:
- Retrieve workout and exercise data from the database for the particular user who is logged in (GET)
- Add new workouts and exercises for that particular logged-in user (POST)
- Update existing workout and exercise details for that particular logged-in user (PUT)

The app uses SQLite as the database for storing user information, workout data, and exercise details. Data persistence is handled through Entity Framework (EF) Core. All data operations, including fetching, adding, and updating workouts and exercises, are facilitated by EF Core. 

For the login processes, I integrated the JWT (JSON Web Token) strategy for secure authentication. Users can:
- Create a new account by providing necessary details.
- Authenticate with their new account, and the credentials are securely checked through the backend.
- Login using valid credentials, which generates a JWT token to authorize their requests to access their own personal workout data.

Therefore, this multi-user authentication system ensures that each user can securely access and manage their personal workout information.

The application has several pages that allow users to:
- Login or Register a new account
- Add new workouts and exercises
- View and update all of their workout history (including all the data from their workouts and exercises)


ii. Why did you choose this specific project?

I chose this project because I have a passion for fitness and wanted to build something useful that aligns with my interests. When thinking about what exactly to create, I thought that a fitness tracker would be a valuable tool for anyone looking to monitor and improve their workout routine. Thus, this project provided a good opportunity for me to create this valuable and practical application. 

iii. If you had more time, what would you do differently?

If I had more time, there are a few improvements I would make to enhance my app's functionality and user experience:

- Styling Improvements: I would focus on the CSS styling to make the app look more sleek and modern. 

- Delete Functionality: I would implement an API endpoint for deleting workouts or exercises. This would allow users to remove any data they no longer need so that they have more flexibility in managing their workout logs.

- Dashboard and Data Visualizations: I would create a robust dashboard that provides a graphical representation of the user's workout data. Users would be able to see progress over time, track consistency, and visualize their workouts in order to analyze trends in their fitness routines.

- Advanced User Analytics: The app could include more advanced features such as tracking workout goals, suggesting improvements, and even providing feedback on the user's workout patterns based on the data that they have logged.


## Requirements
Choose a project that fulfills the following requirements:

	1. Front end must be a react application
	2. Back end must be a dotnet application
		a. Must include GET, POST and PUT api calls
	3. Must have data persistence to a database.  This can be a SQL lite database, MS SQL, MySQL, Mongo, etc.  You can use multiple databases if you'd like. 
	4. The Entity Framework must handle all communication between the dotnet application and the database
	5. Your application must have a login page with support of Oauth2.0 Authentication and handle multiple users.
		a. It should have a workflow for creating a new account
		b. Authenticating against that new account
		c. Being able to login with that new account
	6. Must have multiple pages and/or views
	7. Project demo will be live during week 10 or by video and submitted via D2L
		a. Submission will require a document or PowerPoint presentation describing your project
			i. Describe each of the above requirements and how your project meets them
			ii. Why did you choose this specific project
			iii. If you had more time, what would you do differently
		b. Project  source code must be committed to GitHub.  If you submit a presentation but do not commit source code then you will receive a 0%.  



