import React from 'react'
import { useDispatch } from 'react-redux'
import { likeBlog } from '../reducers/blogReducer'

const BlogDetailed = ({
  blog
}) => {

  if (!blog) {
    return null
  }
  const dispatch = useDispatch()

  const handleLike = async (event) => {
    event.preventDefault()

    try {
      dispatch(likeBlog(blog.id))
    } catch (error) {
      console.error(error.message)
    }
  }


  return (
    <div>
      <h2>{blog.title}</h2>
      <a href={blog.url}>{blog.url}</a>
      <p>{blog.likes} likes <button onClick={handleLike}>like</button></p>
      <p>added by {blog.user.name}</p>
    </div>
  )
}

export default BlogDetailed