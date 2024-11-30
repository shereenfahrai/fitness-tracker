## Documentation

### Description of Project 

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

### Why did I choose this specific project?

I chose this project because I have a passion for fitness and wanted to build something useful that aligns with my interests. When thinking about what exactly to create, I thought that a fitness tracker would be a valuable tool for anyone looking to monitor and improve their workout routine. Thus, this project provided a good opportunity for me to create this valuable and practical application. 

### If I had more time, what would I do differently?

There are a few improvements I would make to enhance my app's functionality and user experience:

- Styling Improvements: I would focus on the CSS styling to make the app look more sleek and modern. 

- Delete Functionality: I would implement an API endpoint for deleting workouts or exercises. This would allow users to remove any data they no longer need so that they have more flexibility in managing their workout logs.

- Dashboard and Data Visualizations: I would create a robust dashboard that provides a graphical representation of the user's workout data. Users would be able to see progress over time, track consistency, and visualize their workouts in order to analyze trends in their fitness routines.

- Advanced User Analytics: The app could include more advanced features such as tracking workout goals, suggesting improvements, and even providing feedback on the user's workout patterns based on the data that they have logged.
