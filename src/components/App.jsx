import Header from './Header'; 
import Footer from './Footer';
import Home from './Home';
import Postblog from './Postblog';
import About from './About'; 
import { useState, useEffect } from 'react';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'; //allowing redirects to page components using React so it doesn't need to request to server
import axios from "axios"; 

//Toast imports --> https://fkhadra.github.io/react-toastify/installation
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  const [postsData, setPostsData] = useState([{
    title: "",
    content: "",
    date: "",
    imgURL: ""
  }]); 

  function addPost(newPost){
    //using axios to post the new blog to MongoDB Atlas through backend server --> router.route("/create")
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

  function deleteNote(id){
    setPostsData(prevNotes => {
        return prevNotes.filter((post, index) => {
            return index !== id; 
        });
    });
  }

  //fetch blogs data from Server where data is retrieved from MongoDB 
  useEffect(() => {
    fetch("http://localhost:3001/")
      .then((res) => res.json())
      .then((jsonRes) => setPostsData(jsonRes)); 
  }, [postsData]);
  
  return (
    <div>
      {/* Implementing error toast due to POST new blog error (Network)*/}
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
          <Route path="/" element={<Home data={postsData} onDelete={deleteNote}/>} />
          <Route path="/postblog" element={<Postblog onAdd={addPost}/>} />
          <Route path="/about" element={<About />} />
        </Routes>
        <Footer />
      </Router>
    </div>
  );
}

export default App;
