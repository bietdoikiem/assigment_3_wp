This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

Back-end: http://localhost:5000
How-to-use Back-end URLS:

### STUDENTS
GET: /students : get all students. <br/>
GET: /students/id : get student by id. <br/>
POST: /students : post a student. ( requires a proper id ) <br/>
DELETE: /students/id : delete a student by id. <br/>
PUT: /students/id : Update a student. <br/>
GET: /students/all/filter?name=[student_name] : Search for students by name. <br/>

### COURSES
GET: /courses : get all courses. <br/>
GET: /courses/id : get course by id. <br/>
POST: /courses : post a course ( requires a proper id ) <br/>
DELETE: /courses/id : delete a course by id. <br/>
PUT: /courses/id : Update a course. <br/> 
GET: /courses/all/filter?name=[course_name] : Search for courses by name. <br/>

### PROJECTS
GET: /projects : get all projects. <br/> 
GET: /projects/id : get project by id. <br/> 
GET: /projects/byCourse/id : get project by course's id. <br/> 
GET: /projects/byStudent/id : get project by student's id. <br/> 
POST: /projects : post a project (require a proper student ID)<br/>
DELETE: /projects/id : delete a project by id. <br/>
PUT: /projects/id : Update a project. <br/> 
GET: /projects/all/filter?name=[project_name] : Search for projects by name.<br/>

Front-end: http://localhost:3000

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

### `npm run dev`
To run both back-end and front-end in the same terminal. (Useful for full-stack developer)

### `npm test`

Launches the test runner in the interactive watch mode.<br />
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.<br />
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br />
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (Webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: https://facebook.github.io/create-react-app/docs/code-splitting

### Analyzing the Bundle Size

This section has moved here: https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size

### Making a Progressive Web App

This section has moved here: https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app

### Advanced Configuration

This section has moved here: https://facebook.github.io/create-react-app/docs/advanced-configuration

### Deployment

This section has moved here: https://facebook.github.io/create-react-app/docs/deployment

### `npm run build` fails to minify

This section has moved here: https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify
