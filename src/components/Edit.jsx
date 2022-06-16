import { useState, useEffect } from 'react'; 
import {useNavigate, useLocation} from 'react-router-dom';  //allows redirects (Remember to npm install react-router-dom)
import Button from '@mui/material/Button'; //using material UI npm package Button
import UpgradeIcon from '@mui/icons-material/Upgrade'; //using material UI npm package Icon
import FileBase64 from 'react-file-base64'; //uploading and converting image file to base64
import axios from 'axios';

function Editblog(props){
    const [post, setPost] = useState({ title: "", content: "", date: "", month: 0, imgURL: ""}); 
    const [image, setImage] = useState([]);

    //retrieve Blog ID passed from Container.jsx "editClick()"
    const blogID = useLocation();

    //Maybe Get request here to fetch the correct Blog from MongoDB?????? instead of using useEffect() 

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

    //When first Render page Fetch/GET the correct blog from MongoDB
    useEffect(() => {
        axios.get(`http://localhost:3001/getblog/${blogID.state.blogID}`)
            .then((response) => {
               //console.log(response.data) 
               setPost({
                   title: response.data.title,
                   content: response.data.content,
                   date: response.data.date,
                   month: response.data.month,
                   imgURL: response.data.imgURL
               }); 

               setImage(response.data.imgURL);
            })
            .catch((error) => {console.log(error)})
    }, []); 

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

    function updatePost(event){
        //prevent page refreshing 
        event.preventDefault(); 

        //passing in the post/blog object to function "updateBlog()" in App.jsx to be updated in MongoDB
        props.onEdit(blogID.state.blogID, post); 

        //redirect to Home page
        pageRedirect("/");  
    }

    return (
        <div className="content-container">
            <div>
                <h2 className="cursive-font">Edit Blog</h2>
                <form onSubmit={updatePost}>
                    <input className="form-control item" name="title" value={post.title} placeholder="Title" onChange={handleChange} required/>
                    <textarea className="form-control item" name="content" value={post.content} placeholder="Contents" rows="5" onChange={handleChange}/>
                    {/*Upload image button to convert to base64*/}
                    <FileBase64 type="file" multiple={false} onDone={imageChange}/>
                    {/* if image array has imageURL then show preview image,else will display "alt"*/}
                    { image.length > 0 && <img className="image-preview" src={post.imgURL} alt="Uploaded Preview"/>}
                    <br/>
                    <br/>
                    <Button variant="contained" startIcon={<UpgradeIcon/>} type="submit">Update</Button>
                </form>
            </div>
        </div>
    );
}

export default Editblog;