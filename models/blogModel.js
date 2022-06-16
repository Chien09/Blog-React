//This is the data Mongoose Model for blog 

const mongoose = require("mongoose");

//create schema 
const blogSchema = new mongoose.Schema({
    title: String,
    content: String,
    date: String,
    month: Number, //for sorting purposes
    imgURL: String
});

//create model collection based on blogSchema requirments 
//"Blog" will automatically change name into "Blogs" when collection stored
//EXAMPLE if it is --> const Person = mongoose.model("Person", personSchema) 
//then it will automatically be stored as "people" collection 
const Blog = new mongoose.model("Blog", blogSchema); 

//export for use 
module.exports = Blog; 