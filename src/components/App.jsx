import Header from './Header'; 
import Footer from './Footer';
import Home from './Home';
import Postblog from './Postblog';
import About from './About'; 
import { useState } from 'react';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'; //allowing redirects to page components using React so it doesn't need to request to server

function App() {
  const [postsData, setPostsData] = useState([]); 

  function addPost(newPost){
    setPostsData(prevNotes => {
        return [...prevNotes, newPost];
    });
  }

  function deleteNote(id){
    setPostsData(prevNotes => {
        return prevNotes.filter((post, index) => {
            return index !== id; 
        });
    });
  }

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
