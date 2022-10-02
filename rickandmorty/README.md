Creating a single-page application

https://github.com/PacktPublishing/React-Projects-Second-Edition/tree/main/Chapter01


Node.js v14.17.0 at least
Npm v6.14.3 at least

React Developer Tools Plugin, Chrome Web Store (https://chrome.google.com/webstore) or Firefox Add-ons (https://addons.mozilla.org)


Setting up a project

mkdir chapter-1
cd chapter-1
npm init -y

https://docs.npmjs.com/cli/v6/configuring-npm/package-json

Setting up Webpack 5

Webpack is a library that lets us create a bundle out of JavaScript/React code that can be used in a browser

1.
npm install --save-dev webpack webpack-cli

2.
Add src/index.js: console.log('Rick and Morty');

4. Change package.json:
-     "test": "echo \"Error: no test specified\" &&
               exit 1"
+     "start": "webpack --mode development",
+     "build": "webpack --mode production"

npm start = run Webpack in development mode
npm run build = create a production bundle using Webpack

The biggest difference is that running Webpack in production mode will minimize our code and decrease the size of the project bundle.

5,6. Start up Webpack -- dist/main.js is created
npm start 
or
npm run build (will minimize the code)

The main.js contains project code i.e. our bundle

7. Check that code is working
node dist/main.js






Configuring Webpack to work with React

Packages for React (Dependencies to be installed):
- react, generic core package for react
- react-dom, entry point to browsers DOM + rendering of react

npm install react react-dom

Correct compilers (To compile JS to readable for for every browser -- Babel)

npm install --save-dev @babel/core babel-loader @babel/preset-env @babel/preset-react

- babel-loader, helper so that babel can run with webpack and the two preset packages
- @babel/preset-env, determines which plugin will be used to compile JS into readable format for browser
- @babel/preset-react, determines which plugin will be used to compile React into readable format for browser

Now packages for React and correct compilers have been installed


Now make them work with Webpack so they are used when running our application
-- create configuration files for Webpack and Babel

babel.config.json
webpack.config.js

Now Webpack and Babel have been set up to run React from command line





Rendering a React project

1. Create React component in src/index.js
2. Create public/index.html with Element referenced to from src/index.js

4. Extend Webpack so that it adds minified bundle code to the body tags as scripts when running

npm install --save-dev html-webpack-plugin

webpack.config.js:

+ const HtmlWebpackPlugin = require('html-webpack-plugin');
...
+   plugins: [
+     new HtmlWebpackPlugin({
+       template: './public/index.html',
+       filename: './index.html',
+     }),
+   ],
};

npm start
- webpack starts in development mode
- adds index.html into dist directory
  - scripts tag have been added and directs us to our application bundle dist/main.js

Open in browser or run "open dist/index.html"
-- result directly in browser

npm run build
-- same thing but code minified






Creating a development server - to not rerun "npm start" -- webpack-dev-server
-- Adds the option to to force wevpack to restart every time we make changes to our project files and manages our application files in memory instead of by building the dist directory.

npm install --save-dev webpack-dev-server

Edit dev to user webpack-dev-server instead of Webpack
package.json:
...
    "scripts": {
-       "start": "webpack –mode development",
+       "start": "webpack serve –mode development",

npm start
-- http://localhost:8080/

Now the basic development environment for our React app is ready





Structuring a project

dist - output from Webpacks bundled version of app
src - source code
public - html code
node_module - library dependencies


Creating new components

src/components/List.js
+ Add to index.js

src/components/Character.js
+ Add to List.js





Retrieving data

Rick and Morty REST API (https://rickandmortyapi.com/documentation/#rest)

To store the information, we'll be using the built-in state management (https://reactjs.org/docs/state-and-lifecycle.html) in React. Anything stored in the state can be passed down to the low-level components, after which they are called props. A simple example of using state in React is by using the useState Hook, which can be used to store and update variables. Every time these variables change using the update method that is returned by the useState Hook, our component will re-render.

https://reactjs.org/docs/hooks-intro.html

The base URL for the API is https://rickandmortyapi.com/api
- All GET requests
- https
- /character endpoint
- id, name, origin, image


Prepare Character component to receive the information about Rick and Mortyt
-- Handle props in Character component
-- Add characters state to List component 
-- Add useEffect hook to List component to fetch data
-- Add loading indicator
-- Add outputting of characters to List component






Adding styling (with Bootstrap)

npm install --save-dev bootstrap

Add to src/index.js (entry point) for applying to all components in hierarchy
import 'bootstrap/dist/css/bootstrap.min.css'

Add appropriate loaders to have Webpack compile CSS

npm install --save-dev css-loader style-loader

Add these packages as a rule to the Webpack configuration
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },

Order is important - Webpack reads settings from right to left
css-loader - handles the compilation of the CSS file (compiled before it is attached to DOM)
style-loader - adds the compiled CSS files to the React DOM

-- Now already small styling changes from the default Bootstrap stylesheet

Now style index.js first as the container for the entire application
-     <div>
+     <div className='container'>

Now style List component with a grid to display Characters components
-- Wrap the map function in a div element to treat it as a row container for Bootstrap
+     <div className='row'>
...
+     </div>

The code for the Character component must also be altered to add styling using Bootstrap
-- Add column and styling

Add a header to the index.js
-       <h1>Rick and Morty</h1>
+       <nav className='navbar sticky-top navbar-light bg-dark'>
+         <h1 className='navbar-brand text-light'> Rick and Morty</h1>
+       </nav>





Adding ESLint

npm install --save-dev eslint eslint-webpack-plugin eslint-plugin-react

eslint
  the core package and helps us identify any potentially problematic patterns in our JavaScript code

eslint-webpack-plugin
  a package that is used by Webpack to run ESLint every time we update our code

eslint-plugin-react
  rules to ESLint for React applications.


Configure .eslintrc in project root

{
  "env": {
    "browser": true,
    "node": true,
    "es6": true
  },
  "parserOptions": {
    "ecmaVersion": 2020,
    "sourceType": "module"
  },
  "plugins": ["react"],
  "extends": ["eslint:recommended",
              "plugin:react/recommended"],
  "rules": {
    "react/react-in-jsx-scope": "off"
  }
}

env 
- sets the actual environment our code will run in and will use es6 functions in it

parserOptions
- extra configuration for using jsx and modern JavaScript

plugins
- specify that our code uses react as a framework

extends
- recommended settings for eslint
- framework-specific settings for React

rules
- rule to disable the notification about React not being imported
  as this is no longer required in React 18.


NOTE

We can run the eslint --init command to create custom settings, but using the preceding settings is recommended so that we ensure the stability of our React code.

If we look at our command line or browser, we will see no errors. However, we have to add the eslint-webpack-plugin package to the Webpack configuration. In the webpack.config.js file, you need to import this package and add it as a plugin to the configuration:

// To create custom settings
eslint --init

Add eslint-webpack-plugin package to webpack configuration

webpack.config.js:
  const HtmlWebpackPlugin = require('html-webpack-plugin');
+ const ESLintPlugin = require('eslint-webpack-plugin');
  module.exports = {
    // ...
    plugins: [
      new HtmlWebpackPlugin({
        template: './public/index.html',
        filename: './index.html',
      }),
+     new ESLintPlugin(),
    ],
  };

-- Basic React application using
- React
- ReactDOM
- Webpack
- Babel
- ESLint
- Bootstrap

Further reading
  Thinking in React: https://reactjs.org/docs/thinking-in-react.html
  Bootstrap: https://getbootstrap.com/docs/4.3/getting-started/introduction/
  ESLint: https://eslint.org/docs/user-guide/getting-started
