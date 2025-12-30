# Before Setting up your local machine

In order to setup your project, you will need the following from your IT officer.
1. AWS Account
2. your account must be part of the "Developers" IAM group.
3. Private and Public Key associated with you AWS Account.

# Setting up your local machine
In order to setup your machine, you will need to install the following applications

## Node.Js
Node.js is a js server and compiler. it also include NPM which will manage all of your packages for your react application.

## AWS CLI
AWS CLI is required in order to execute aws-remote-codecommit and be able to access CodeCommit AWS resource to pull and push code.

## Amplify CLI Gen 1
Amplify CLI is necessary in order to deploy changes to Amplify's backend.  You can download Amplify CLi from https://docs.amplify.aws/gen1/javascript/tools/cli/start/set-up-cli/ 

## Amplify Libraries.
Amplify Libraries are necessary to be able to support Amplify code within your application.

## Install Git
Download and install git for windows from https://git-scm.com/downloads/win 

## restore all packages
Execute the command below to resotre all packages

```
npm install
```

## Connect Amplify Project 
### WINDOWS MACHINES NOTE 
if confliguring the solution on a windows machine, then first ensure that policy execution is allowed for remotely signes scripts to run. you can do so by running PowerShell as an adninistrator, then running the following command
```
set-executionpolicy remotesigned
````

### ALL MACHINES
You will need to pull the latest backend configuraiton from our aws dev instance. To do so, you need to do the following 

```
amplify pull --appId d1mic720aon5ug --envName devenv
```

And follow the command prompts. 


# Running the project 
## Debug
Within your IDE, click "Run and Debug" , then select "Launch Chrome against Localhost".

## Start
From within your terminal, execute "npm start"

# Adding backend points.

# Coding Standards

# Raising a Pull Request
## PR Requirements
### Unit Tests
### UI Autmation Tags
#### Please ensure all HTML elements use an automation attribute data-cy
### Automation Scripts




# Deployment Process to Dev


## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).