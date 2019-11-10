## Steps to run
1. clone the repository
2. open terminal in the cloned repository
3. run following commands
    1. npm install
    2. node functions/index.js
    3. server will start on port 3004 <br/>
    4. Project try to start on port 3000 <br/>
        npm start
4. open the link in browser.
    localhost:3000


## Hosted on firebase
live link: https://weatherapp-6ce0c.firebaseapp.com/

## Development Info

This project is built on create-react-app
following features available in this project:
1. Store
2. redux
3. saga
4. async injection of reducer to store
5. async injection of saga to store
6. axios
7. centralised routes
8. css module to import css styles as css module.
9. Sample project to select the city from the list.

# Store
In this project Store is configured and can see the configuration in following path
/src/utilities/store/index.js

# Redux
In this project Redux is configured and can see the configuration in following path
/src/utilities/redux/index.js

# saga
In this project Saga is configued and see the configuration in store config.

# async injection of reducer to store
In this project async injection of reducers is supported. can see the config in the following path
/src/utilities/hooks/index.js

# async injection of saga to store
In this project async injection of sagas is supported. can see the config in the following path
/src/utilities/hooks/index.js

# axios
In this project created configuration for api calls and axios is used to call api. You just need to call the api service factory which will return the function will call defualt methods(GET, PUT, DELETE, POST). Can see the example for more details.

# Centralised routes
This is the main feature of this project. Here we are supporting centralised routing. You can create centralised routes easily. can see the example for more details. 

Supported feautres:
1. we can inject reducer when route matches
2. we can inject sagas when route matches
3. we can render decide the component to be mounted when the route matches.
4. we support nested child routes with easy configs.
5. we can pass extra keys in the route so that can be used in the components props.
6. we get the matched routes array as a props to the component. 

# css module to import css styles as css module

Here we support the import css files as module and can use the class names with file name

example:

import styles from './styles.module.css'

<div className={styles.container}>container class is applied to this div and its local class can not be used globally.</div>

# Sample project to select the city from the list
Here provided one sample project to understand all above features.
structure:
on base route Home container is mounted. You will get the container at following path:
/src/containers/Home/index.js
In this folder you will get reducer, saga, selector, constants, actions.

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br>
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.<br>
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.<br>
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br>
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
