import Header from './Header'; 
import Footer from './Footer';
import Home from './Home';
import Postblog from './Postblog';
import Editblog from './Edit'; 
import About from './About'; 
import { useState, useEffect } from 'react';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'; //Using Router, Routes, Route allows page navigation not needing to request to server (injection)
import axios from "axios"; 

//Toast imports --> https://fkhadra.github.io/react-toastify/installation
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  const [postsData, setPostsData] = useState([{
    title: "",
    content: "",
    date: "",
    month: 0, //for sorting purposes
    imgURL: ""
  }]); 

  function addPost(newPost){
    //axios to POST new blog to MongoDB Atlas through backend server--> router.route("/create")
    axios.post("http://localhost:3001/create", newPost)
      .catch((error) => {
        //show error toast 
        toast.error("Could not POST or SAVE new blog post to cloud database, due to connection problem. Please try again.");
        console.log(error);
    });

    // setPostsData(prevNotes => {
    //     return [...prevNotes, newPost];
    // });
  }

  function updateBlog(id, blog){
    //axios to PUT/UPDATE blog at MongoDB Atlas through backend server--> router.route("/edit/:id")
    axios.put(`/updateblog/${id}`, blog)
    .then((response) => { console.log(`Blog Post ID:${id} has been update in the Database!`)})
    .catch((error) => {
      toast.error("Could not UPDATE blog post in the database at the moment. Please try again.");
      console.log(error); 
    });
  }

  function deleteBlog(id){
    //axios to DELETE blog at MongoDB Atlas through backend server--> router.route("/delete/:id")
    axios.delete(`http://localhost:3001/delete/${id}`)
      .then((response) => {console.log(`Blog Post ID:${id} has been deleted from Database!`);})
      .catch((error) => {
        toast.error("Could not DELETE blog post at the database at the moment. Please try again.");
        console.log(error); 
      });

    // setPostsData(prevNotes => {
    //     return prevNotes.filter((post, index) => {
    //         return index !== id; 
    //     });
    // });
  }

  //fetch blogs data from Server where data is retrieved from MongoDB 
  useEffect(() => {
    fetch("http://localhost:3001/")
      .then((res) => res.json())
      .then((jsonRes) => setPostsData(jsonRes)); 
  }, [postsData]);
  
  return (
    <div>
      {/* Implementing error toast for CRUD operations (Network Problems)*/}
      <ToastContainer position="top-center"
      autoClose={5000}
      hideProgressBar={false}
      newestOnTop={false}
      closeOnClick
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover
      theme="dark"
      />

      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<Home data={postsData} onDelete={deleteBlog}/>} />
          <Route path="/postblog" element={<Postblog onAdd={addPost}/>} />
          <Route path="/editblog" element={<Editblog onEdit={updateBlog}/>} />
          <Route path="/about" element={<About />} />
        </Routes>
        <Footer />
      </Router>
    </div>
  );
}

export default App;