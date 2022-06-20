//Backend Server

//Enviornment variable to separate secrets, this must be on the very top 
require('dotenv').config();

const express = require("express");
const bodyParser = require("body-parser"); //allowing to get the data sent from client side through <form></form>
const mongoose = require("mongoose");
const cors = require("cors"); //allowing "same-origin policy", so frontend can communicate with backend server 

const app = express(); 

//parse JSON data requests and puts it into request.body (for POST and PUT requests)
//app.use(express.json());
app.use(express.json({limit: "30mb",extended:true})); //allows uploading larger images with no error

//body-parser can be used with express
//urlencoded is to grab information or data from <form></form> 
//extended: true allows to POST nested objects
app.use(bodyParser.urlencoded({extended: true}));

app.use(cors()); 

//apply our custom Router for CRUD requests
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

const Blog = require("./models/blogModel"); 

//insert testing blogData into MongoDB Atlas, we only want to do this once 
//will be stored "reactblogDB" collections in MongoDB Atlas
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

//send blog Data to client 
app.get("/", function(request, response){
    //response.send("Express Server Here"); 

    //Print all blog data from MongoDB Atlas 
    Blog.find({}, function(err, blogs){
        if(err){
            console.log(err);
        } else{
            response.json(blogs); 
        }
    })

    //OR 
    // Blog.find({})
    //     .then((blogs) => response.json(blogs))
    //     .catch((err) => console.log(err)); 
});

//create server listening at port 3001 (Backend Server) The frontend is at port 3000 
//IMPORTANT! Add "proxy": "http://localhost:3001" into "package.json" so frontEnd can communicate with backend server when project deployed onto Heroku
app.listen(3001, function(){
    console.log("Server is up and running at port 3001..."); 
});
