/*
Backend Server

• Install package.json --> npm init 

• Install Express, EJS, body-parser --> npm i express ejs body-parser 

• Using "dotenv" enviornment variable to keep our password/link string safe, install --> npm i dotenv
NEED to create a file ".env" to store the SECRET or other important Keys like API Key using command --> touch .env
IMPORTANT!!!! DO NOT upload ".env" to respository, need to include it in ".gitignore" file
Reference dotenv --> https://www.npmjs.com/package/dotenv

• Install Mongoose --> npm install mongoose 

• When testing Server (node app) and FrontEnd (npm start) need to install --> npm i cors 
  -so no warnings will come up such as "Origin http://localhost:3000 is not allowed by Access-Control-Allow-Origin."
  -essentiall using cors allows "same-origin policy" --> https://medium.com/@dtkatz/3-ways-to-fix-the-cors-error-and-how-access-control-allow-origin-works-d97d55946d9


WEBSITE LINK: https://daily-blog-9.herokuapp.com
*/

//Enviornment variable to separate secrets, this must be on the very top 
require('dotenv').config();

const express = require("express"); //server framework 
const bodyParser = require("body-parser"); //allowing to get the data sent from client side through <form></form>
const mongoose = require("mongoose");
const cors = require("cors"); //allowing "same-origin policy", so frontend can communicate with backend server 

const app = express(); 

//parse JSON data requests and puts it into request.body (for POST and PUT requests)
//app.use(express.json());
app.use(express.json({limit: "30mb",extended:true})); //allows uploading larger images with no error

//urlencoded is to grab information or data from <form></form> 
//extended: true allows to POST nested objects
app.use(bodyParser.urlencoded({extended: true}));

app.use(cors()); 

//apply our custom API Routes for CRUD requests
app.use("/", require("./routes/allRoutes"));

//Testing blogData at Mongoose Atlas
// const blogs = [
//     {
//         title: "Mount Fuji",
//         content: "Mount Fuji is also known as Fujiyama which is located in central Honshu, Japan. Mount Fuji is the highest mountain in Japan with a height of approximately 3,776 meters (12,388 feet). Mount Fuji is a famous tourist attraction for various activites including hiking, sightseeing, and camping. Visiting mount Fuji is definately on my bucketlist.",
//         date: "February 9, 2022",
//         month: 1, //for sorting purposes
//         imgURL: "https://www.tripsavvy.com/thmb/xmHHjutbUKGMvgxh5Dr1F_BVXB8=/3435x2576/smart/filters:no_upscale()/fuji-mountain-in-autumn-822273028-5a6a8a9c3418c600363958d3.jpg"
//     },
//     {
//         title: "Pad Kra Pao",
//         content: "Pad Kra Pao is one of my favorite dish to eat which is a very popular Thai food dish in Thailand. 'Pad' means fried and 'Kra Pao' is the name of the holy basil which is one of the main ingredient of the dish. The dish is mainly prepared with pork as the protein along with holy basil, Thai chili pepper, fried egg, and rice. Pad Kra Pao tastes rich in balance of sweet, spicy, salty, and flavor of holy basil.",
//         date: "February 20, 2022",
//         month: 1,
//         imgURL: "https://4.bp.blogspot.com/-MMVkoEOdelc/TiG3YT77o_I/AAAAAAAAGOI/PNXUOKcMUO8/s1600/Pad%2BKaprao%2BCover.jpg"
//     },
//     {
//         title: "French Bulldog",
//         content: "French Bulldogs are one of my favorite dog breeds because they are so adorable and love to cuddle!",
//         date: "April 23, 2022",
//         month: 3,
//         imgURL: "https://img.joomcdn.net/76385d56972752dbcae94650ca72bb5936063836_original.jpeg"
//     },
//     {
//         title: "Koh Samui",
//         content: "Koh Samui is Thailand's second largest island which is located in the far south of Bangkok at the Gulf of Thailand. It is also a famous tourist spot when the season is right which is around December to February. Koh Samui has more private and calmer beaches than that of Phuket's beaches. If you are looking for a more quiet beach experience than Koh Samui is probably for you. If not, then Phuket's beaches are very lively and more populated. Koh Samui is also one of my favorite destinations for vacation.",
//         date: "May 15, 2022",
//         month: 4, 
//         imgURL: "https://www.planetware.com/wpimages/2019/07/thailand-bangkok-to-koh-samui-best-ways-to-get-there-air.jpg"
//     }
// ];

//connect to MongoDB Atlas
mongoose.connect(
    process.env.MONGO_URL, 
    function (err){
        if(!err){
            console.log("Database connected...");
        } else{
            console.log(err); 
        }
    }
); 

//const Blog = require("./models/blogModel"); 

//insert testing blogData into MongoDB Atlas
//will be stored in "reactblogDB" collections in MongoDB Atlas
// blogs.forEach( 
//     blog => {
//         const blogObject = new Blog({
//             title: blog.title,
//             content: blog.content,
//             date: blog.date,
//             month: blog.month,
//             imgURL: blog.imgURL
//         }); 
        
//         blogObject.save(function(err){
//             if(err){
//                 console.log(err); 
//             }
//         });
//     }
// );

/*
HEROKU deployment setup 
• delete .git and .gitignore in the client folder by using this command --> rm -fr .git 
• create .gitignore at root folder 
• create Procfile at root folder (Telling Heroku how to run this server.js)
• add scripts to package.json file (Heroku uses package.json to know which scripts to run and dependencies to install for the project to run)
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1",
    "start": "node server.js",
    "heroku-postbuild": "NPM_CONFIG_PRODUCTION=false npm install --prefix client"
  }

• OPTIONAL you can specify which node version to run example: 
    "engines": {
        "node": "10.16.0"
    }
• create .git in the root folder of the project --> git init 
• access Heroku --> heroku login
• create Heroku app --> heroku create project-name 
• after heroku create copy the first address https://daily-blog-9.herokuapp.com to replace 
the "proxy": "http://localhost:3001" in client's side "package.json" 
• Make sure to change all the axios CRUD operations route path from http://localhost:3001/... to https://daily-blog-9.herokuapp.com/... in the client side in App.jsx file and Edit.jsx 
• run build in client side --> npm run build 
• connect to Heroku app created --> heroku git:remote -a daily-blog-9
• commit project to repository --> git add . --> git commit -am "first upload"
• then push the commit to heroku app --> git push heroku master

References --> 
https://www.freecodecamp.org/news/deploying-a-mern-application-using-mongodb-atlas-to-heroku/

https://www.youtube.com/watch?v=ouZy7s7bHjw


WEBSITE LINK: https://daily-blog-9.herokuapp.com

*/

const path = require('path');
const port = process.env.PORT || 3001; //use dynamic port by Heroku, port 3001 is for local development use 

if(process.env.NODE_ENV === "production"){
    app.use(express.static('client/build')); //include all assets and CSS from the 'build' folder  
    app.get('*', (request, response) => {
        response.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html')); //load index.html from 'build' folder
    });
}

//create server listening at port 3001 locally (Backend Server) The frontend is at port 3000 locally 
//IMPORTANT! Add "proxy": "http://localhost:3001" into client's "package.json" so frontEnd can communicate with backend server 
app.listen(port, function(err){
    if(err){
        return console.log(err); 
    }
    console.log(`Server is up and running at port ${port}...`); 
});
