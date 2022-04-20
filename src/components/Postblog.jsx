import { useState } from 'react'; 
import {useNavigate} from 'react-router-dom';  //allows redirects (Remember to npm install react-router-dom)
import Button from '@mui/material/Button'; //using material UI npm package Button
import AddIcon from '@mui/icons-material/Add'; //using material UI npm package Icon

function Postblog(props){
    const [post, setPost] = useState({ title: "", content: ""}); 

    //invoke useNavigate for page redirects 
    const pageRedirect = useNavigate(); 

    //method to handle input and save the post input title & content state 
    function handleChange(event){
        const {name, value} = event.target;

        setPost(prevNote => {
            return {
                ...prevNote,
                [name] : value
            };
        });
    }

    function submitPost(event){
        //passing the new Post object to function "addPost" in App.jsx to be added 
        props.onAdd(post); 

        //clearing the input tittle and content 
        setPost({ title: "", content: ""}); 

        //prevent page refreshing 
        event.preventDefault(); 

        //redirect to Home page
        pageRedirect("/");  

        //to pass data during redirect 
        //pageRedirect("/weatherreport", {state: Data});  
    }

    return (
        <div className="content-container">
            <div>
                <h2>Compose</h2>
                <form>
                    <input className="form-control item" name="title" value={post.title} placeholder="Title" onChange={handleChange} type="text" required/>
                    <textarea className="form-control item" name="content" value={post.content} placeholder="Contents" rows="5" onChange={handleChange}/>
                    <Button variant="contained" startIcon={<AddIcon/>} onClick={submitPost}>Add</Button>
                </form>
            </div>
        </div>
    );
}

export default Postblog;