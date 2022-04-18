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

NOTE: once you made code changings the html page will update automatically at "localhost:3000"

• Install "react-router-dom" allowing page redirects by using "useNavigate" --> npm install react-router-dom
*/

import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';

ReactDOM.render(
  <App/>, document.getElementById('root')
);
