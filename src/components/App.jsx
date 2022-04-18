import Header from './Header'; 
import Footer from './Footer';
import Home from './Home';
import Postblog from './Postblog';
import About from './About'; 
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'; //allowing redirects to page components using React so it doesn't need to request to server

function App() {
  return (
    <div>
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/postblog" element={<Postblog/>} />
          <Route path="/about" element={<About />} />
        </Routes>
        <Footer />
      </Router>
    </div>
  );
}

export default App;
