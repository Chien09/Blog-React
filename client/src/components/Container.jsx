import Button from '@mui/material/Button'; //using material UI npm package Button
import DeleteIcon from '@mui/icons-material/Delete';  //using material UI npm package Icon
import EditIcon from '@mui/icons-material/Edit';
import {useNavigate} from 'react-router-dom'; 

function Container(props){

    //for page redirects 
    const pageRedirect = useNavigate();

    //delete post
    function deleteClick(){
        //triggering the deletePost in App.jsx and passing the _id of the note to be deleted on the MongoDB Atlas
        props.onDelete(props.id);
    }

    //edit post
    function editClick(){
        //redirect to Edit Blog page passing the blog _id
        pageRedirect("/editblog", {state: {blogID: props.id}});  
    }

    return(
        <div className="post-container item">
            <h4>{props.title}</h4>
            <p>{props.content}</p>
            <p className="post-date">{props.date}</p>
            {props.imgURL && <img className="image-preview" src={props.imgURL} alt="Uploaded Pic"/>}
            <div className="edit-button">
                <Button size="small" variant="outlined" startIcon={<EditIcon />} onClick={editClick}>Edit</Button>
            </div>
            <div className="delete-button">
                <Button size="small" variant="outlined" startIcon={<DeleteIcon />} onClick={deleteClick}>Delete</Button>
            </div>
        </div>
    );
}

export default Container; 