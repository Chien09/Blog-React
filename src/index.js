/* 
React Project setup

•	To create a React Project run the command line:
npx create-react-app project-folder-name
it will create a React project with the directory “project-folder-name” 

•	To run the project: npm start 

•	You can delete files you do not need in the project directory. 
  o	Delete all files except “index.html” in the /public folder. 
  o	Delete all files except “index.js” in the /src folder.  
  o	In “index.html” file delete html code in the <head> tag along with <body> tag except for the <div id=”root”></div> where React code will be inserted to the <div>. 
  o	Delete whatever code you will not use in the “index.js” file 
  o	START Coding away 

• Install "react-router-dom" allowing page redirects by using "useNavigate" --> npm install react-router-dom

• Will be using "Material UI" npm package for icons use --> npm install @mui/icons-material
https://mui.com/getting-started/installation/
https://mui.com/components/icons/

• Install Express, EJS, body-parser --> npm i express ejs body-parser 

• Using "dotenv" enviornment variable to keep our password/link string safe, install --> npm i dotenv
NEED to create a file ".env" to store the SECRET or other important Keys like API Key using command --> touch .env
IMPORTANT!!!! DO NOT upload ".env" to respository, need to include it in ".gitignore" file
Reference dotenv --> https://www.npmjs.com/package/dotenv

• Install Mongoose --> npm install mongoose 

• When testing Server (node app) and FrontEnd (npm start) need to install --> npm i cors 
  -so no warnings will come up such as "Origin http://localhost:3000 is not allowed by Access-Control-Allow-Origin."
  -essentiall using cors allows "same-origin policy" --> https://medium.com/@dtkatz/3-ways-to-fix-the-cors-error-and-how-access-control-allow-origin-works-d97d55946d9

• npm install axios 
*/

import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';

ReactDOM.render(
  <App/>, document.getElementById('root')
);
