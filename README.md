# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

```bash
npm start
```

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

```bash
npm test
```

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

```bash
npm run build
```

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

```bash
npm run eject
```

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

```bash
npm run build
``` 
fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)


## Dependencies, requirements, limitations and goals platforms

Dependencies, requirements, limitations and goals platforms can be read in package.json. The package can be installed by writing in active folder:
```bash
npm i 
```

### Package.json

```bash

  "name": "sandrasapp-test",
  "version": "0.1.0",
  "private": true,
  "dependencies": {
    "@stripe/stripe-js": "^1.15.0",
    "@testing-library/jest-dom": "^5.12.0",
    "@testing-library/react": "^11.2.6",
    "@testing-library/user-event": "^12.8.3",
    "axios": "^0.21.1",
    "cors": "^2.8.5",
    "dateformat": "^4.5.1",
    "dotenv": "^10.0.0",
    "firebase": "^8.6.3",
    "react": "^17.0.2",
    "react-dom": "^17.0.2",
    "react-modal": "^3.13.1",
    "react-router-dom": "^6.0.0-beta.8",
    "react-scripts": "4.0.3",
    "stripe": "^8.199.0",
    "web-vitals": "^1.1.1"
  },
  "scripts": {
    "start": "react-scripts start",
    "build": "react-scripts build",
    "test": "react-scripts test",
    "eject": "react-scripts eject"
  },
  "eslintConfig": {
    "extends": [
      "react-app",
      "react-app/jest"
    ]
  },
  "browserslist": {
    "production": [
      ">0.2%",
      "not dead",
      "not op_mini all"
    ],
    "development": [
      "last 1 chrome version",
      "last 1 firefox version",
      "last 1 safari version"
    ]
  }

  ```
## Usage
This is a application idea for my project in Medieinsitutet Stockholm 2022.

The idea:
A student that studies web development can through his or her school register to this app and contribute with your own skills or find help from other students. The idea is to help each other.

### Tabs in browser

-   Sign up
    * The student starts with a registration with firstname, lastname, email and a password with following password confirmation.

-   Log in
    * The students writes their login information, which is email and password from the registration.

-   Create
    * In the tab Create the student is able to become a "Helper". Which means that you register to be able to help other students. In this stage the student has autocompleted information of their name and email, but will register description of their personality, cost for the favour and lastly a picture.

-   Home
    * The startpage shows all the students that have registered themselves as helpers

-   My info
    * In the tab My info the student can change their firstname, lastname, or more likely, their email.

-   Log out
    * There is also a tab to log out from the page.

### Components i VS Code
- AllBookings.js / Under dev: As an admin you should be able to see all bookings.
- Booking.js
- BookingList.js
- Card.js
- Cardlist.js
- config.js
- Create.js
- firebase_config.js /Under dev: For a bigger resource for the database.
- Footer.js
- Home.js
- Login.js
- Logout.js
- My Info.js
- Navbar.js
- Signup.js
- UploadFile.js
- UserGreeting.js

## Futher development
The comments or questions are still in the code to remind the head developer where the last change or idea was made for futher development.

## Contributing
Pull requests are not welcome. For changes, please open an issue first to discuss what you would like to change or constribute with.

Please make sure to update tests as appropriate.

## License
[MIT](https://choosealicense.com/licenses/mit/)
