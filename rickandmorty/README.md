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





