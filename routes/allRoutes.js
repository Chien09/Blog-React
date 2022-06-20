//Contains the different Ruotes for CRUD operations to data stored on MongoDB Atlas

const express = require("express");
const router = express.Router(); 
const Blog = require("../models/blogModel"); //get the blog Data mongoose schema model 

//GET all blogs Data from MongoDB Atlas 
router.route("/").get((request, response) => {
    //response.send("Express Server Here"); 

    Blog.find({}, function(err, blogs){
        if(err){
            console.log(err);
        } else{
            response.json(blogs); 
        }
    });

    //OR 
    // Blog.find({})
    //     .then((blogs) => response.json(blogs))
    //     .catch((err) => console.log(err)); 
}); 

//POST new blog to MongoDB 
router.route("/create").post((request, response) => {
    const newBlogTitle = request.body.title; 
    const newBlogContent = request.body.content;
    const newBlogDate = request.body.date;
    const newBlogMonth = request.body.month; //for sorting purposes 
    const newBlogImgURL = request.body.imgURL; 

    const newBlog = new Blog({
        title: newBlogTitle,
        content: newBlogContent,
        date: newBlogDate,
        month: newBlogMonth,
        imgURL: newBlogImgURL
    });
    
    newBlog.save(); 
});

//Get blog to be edited 
router.route("/getblog/:id").get((request, response) =>{
    const id = request.params.id;

    Blog.findById(id, function(err, blog){
        if(err){
            console.log(err);
        } else {
            return response.json(blog); 
        }
    });
}); 

//Update the edited blog to MongoDB
router.route("/updateblog/:id").put((request, response) => {
    const id = request.params.id;
    const update = request.body; 

    Blog.findByIdAndUpdate(id, update, function(err, blog){
        if(err){
            console.log(err);
        }
    });
});

//DELETE blog in MongoDB
router.route("/delete/:id").delete((request, response) => {
    Blog.findByIdAndRemove(request.params.id, function(err){
        if(!err){
            console.log("Sucessfully deleted blog post!"); 
        }
    });
});

//export for use 
module.exports = router; 