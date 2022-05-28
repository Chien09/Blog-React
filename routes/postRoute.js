//Contains the different Ruotes such as POST blog to MongoDB Atlas

 const express = require("express");
 const router = express.Router(); 
 const Blog = require("../models/blogModel"); //get the blog Data mongoose schema model 

 //POST the new blog to MongoDB 
 router.route("/create").post((request, response) => {
     const newBlogTitle = request.body.title; 
     const newBlogContent = request.body.content;
     const newBlogDate = request.body.date;
     const newBlogImgURL = request.body.imgURL; 

     const newBlog = new Blog({
        title: newBlogTitle,
        content: newBlogContent,
        date: newBlogDate,
        imgURL: newBlogImgURL
    });
    
    newBlog.save(); 
 });

//export for use 
 module.exports = router; 