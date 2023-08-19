import { useState,useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import {format} from 'date-fns'

import DataContext from './context/DataContex'

import api from './api/posts'


const NewPost = () => {

    //new post
    const [postTitle,setPostTitle]=useState('')
    const [postBody,setPostBody]=useState('')

    const navigate = useNavigate()
    const { posts ,setPosts } = useContext(DataContext)

    const handleSubmit= async (e)=>{
      e.preventDefault()
      const id = posts.length ? posts[posts.length-1].id+1 : 1
      const datetime = format(new Date(),'MMMM dd , yyyy pp')
      const newPost = {id:id,body:postBody,title:postTitle,datetime:datetime}
      try{
        const response = await api.post('/posts',newPost)
        const allPosts = [...posts,response.data]
        setPosts(allPosts)
        setPostBody('')
        setPostTitle('')
        navigate('/')
      } catch(err){
        console.log(`error :${err.message}`);
      }
    }
 
    return (
      <main className="NewPost">
      <h2>New post</h2>
      <form onSubmit={handleSubmit}
      className="newPostForm"
      >

        <label htmlFor="title">Title</label>
        <input type="text" id="title" value={postTitle}
          onChange={(e)=>setPostTitle(e.target.value)}
          required
         />

        <label htmlFor="postBody">Post</label>
        <textarea name="postBody" id="postBody" cols="80" rows="10"
        required
        onChange={(e)=>setPostBody(e.target.value)}
        value={postBody}
        ></textarea>
        <button type="submit">
          Submit
        </button>
      </form>
      </main>
    )
  }
  
  export default NewPost