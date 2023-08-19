import { useParams , Link  , useNavigate} from "react-router-dom"
import api from './api/posts'
import { useContext } from 'react'
import DataContext from './context/DataContex'

const PostPage = () => {

    const navigate = useNavigate()
    const {id} = useParams() //defines id on the route , returns sting
    
    const {posts , setPosts } = useContext(DataContext)
    const post = posts.find(post => (post.id).toString()===id)

    const handleDelete =async (id)=>{
      const newPosts = posts.filter(post=>post.id !==id)
      try {
        await api.delete(`/posts/${id}`)
        setPosts(newPosts)
        navigate('/') //comeback to home when deleted
      }  catch(err){
        console.log(`${err.message}`);
      }
    }
    return (
      <main className="PostPage">
        <article className="post">
          {post && 
            <>
              <h2>{post.title}</h2>
              <p className="postDate">{post.datetime}</p>
              <p className="postBody">{post.body}</p>
              <Link to={`/post/edit/${post.id}`}>
                <button className="editButton">Edit post</button>
              </Link>
              <button
              className="deleteButton"
              onClick={()=>handleDelete(post.id)}
              >
                Delete Post
              </button>
            </>
          }
          { !post &&
            <>
            <p> There is no article here</p>
            <Link to='/'>To the home page</Link>
            </>
          }
        </article>
      </main>
    )
  }
  
  export default PostPage