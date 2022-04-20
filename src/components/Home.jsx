import Container from "./Container";
 
function Home(props){
    //Get post Array Data passed from App.jsx 
    const postsData = props.data;
    //console.log(postsData); 

    //Get deletePostFunction passed from App.jsx
    const deletePostFunction = props.onDelete;
    
    return (
        <div className="content-container">
            <h2>Home</h2>
            {postsData.map((post, index) => (
                <Container 
                    key={index}
                    id={index} //for position of the object, used for deleting the correct object 
                    title={post.title}
                    content={post.content}
                    onDelete={deletePostFunction}
                />
            ))}
        </div>
    );
}

export default Home; 