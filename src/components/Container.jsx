import Button from '@mui/material/Button'; //using material UI npm package Button
import DeleteIcon from '@mui/icons-material/Delete';  //using material UI npm package Icon

function Container(props){

    //delete post
    function deleteClick(){
        //triggering the deletePost in App.jsx and passing the id of the note to be deleted
        props.onDelete(props.id);
    }

    return(
        <div className="post-container item">
            <h4>{props.title}</h4>
            <p>{props.content}</p>
            <p className="post-date">{props.date}</p>
            {props.imgURL && <img className="image-preview" src={props.imgURL} alt="Uploaded Pic"/>}
            <div className="delete-button">
                <Button size="small" variant="outlined" startIcon={<DeleteIcon />} onClick={deleteClick}>Delete</Button>
            </div>
        </div>
    );
}

export default Container; 