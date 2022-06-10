import { useState, useEffect } from 'react'; 
import {useNavigate} from 'react-router-dom';  //allows redirects (Remember to npm install react-router-dom)
import Button from '@mui/material/Button'; //using material UI npm package Button
import AddIcon from '@mui/icons-material/Add'; //using material UI npm package Icon
import FileBase64 from 'react-file-base64'; //uploading and converting image file to base64

function Postblog(props){
    //Getting today's date --> Month-Day-Year 
    const dateToday = new Date();
    const months = ["January","February","March","April","May","June","July","August","September","October","November","December"]; 
    const month = months[dateToday.getMonth()];
    const stringDate = `${month} ${dateToday.getDate()}, ${dateToday.getFullYear()}`;

    const [post, setPost] = useState({ title: "", content: "", date: stringDate, imgURL: ""}); 
    const [image, setImage] = useState([]); //saving upload image data

    //useNavigate for page redirects 
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

    //method to handle upload image changes
    function imageChange(file){
        //console.log(file.base64); 
        setImage(file.base64); 
    }

    //called whenever upload or change image to render the preview picture 
    useEffect(() => {
        if(image.length < 1){
            return; //means no image and stop 
        }

        setPost(prevNote => {
            return {
                ...prevNote,
                imgURL : image
            };
        });

    }, [image]);

    function submitPost(event){
        //prevent page refreshing 
        event.preventDefault(); 

        //passing the new Post object to function "addPost" in App.jsx to be added to Posts array
        props.onAdd(post); 

        //clearing the input title and content for next new post 
        setPost({ title: "", content: "", imgURL: ""}); 

        //redirect to Home page and passing imageURL 
        pageRedirect("/");  
    }

    return (
        <div className="content-container">
            <div>
                <h2 className="cursive-font">Compose</h2>
                <form onSubmit={submitPost}>
                    <input className="form-control item" name="title" value={post.title} placeholder="Title" onChange={handleChange} required/>
                    <textarea className="form-control item" name="content" value={post.content} placeholder="Contents" rows="5" onChange={handleChange}/>
                    {/*Upload image button to convert to base64*/}
                    <FileBase64 type="file" multiple={false} onDone={imageChange}/>
                    {/* if image array has imageURL then show preview image,else will display "alt"*/}
                    {image.length > 0 && <img className="image-preview" src={post.imgURL} alt="Uploaded Preview"/>}
                    <br/>
                    <br/>
                    <Button variant="contained" startIcon={<AddIcon/>} type="submit">Add</Button>
                </form>
            </div>
        </div>
    );
}

export default Postblog;