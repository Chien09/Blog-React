import Header from './Header'; 
import Footer from './Footer';
import Home from './Home';
import Postblog from './Postblog';
import About from './About'; 
import { useState, useEffect } from 'react';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'; //allowing redirects to page components using React so it doesn't need to request to server
import axios from "axios"; 

function App() {
  const [postsData, setPostsData] = useState([{
    title: "",
    content: "",
    date: "",
    imgURL: ""
  }]); 

  function addPost(newPost){

    //using axios to post the new blog through --> router.route("/create")
    axios.post("http://localhost:3001/create", newPost);

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
