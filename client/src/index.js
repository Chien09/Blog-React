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

• Install "react-router-dom" to use Router, Routes, and allowing page redirects by using useNavigate --> npm install react-router-dom

• Will be using "Material UI" npm package for icons use --> npm install @mui/icons-material
https://mui.com/getting-started/installation/
https://mui.com/components/icons/

• npm install axios 

WEBSITE LINK: https://daily-blog-9.herokuapp.com
*/

import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './components/App';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

