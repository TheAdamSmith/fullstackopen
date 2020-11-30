import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import {
  Link
} from 'react-router-dom'
import {
  likeBlog,
  deleteBlog,
} from '../reducers/blogReducer'

const Blog = ({
  blog,
}) => {
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
  }

  const dispatch = useDispatch()
  const [visible, setVisible] = useState(false)

  const hiddenWhenVisible = { display: visible ? 'none' : '' }
  const showWhenVisible = { display: visible ? '' : 'none' }

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  const handleLike = async (event) => {
    event.preventDefault()
    const id = event.target.id

    try {
      dispatch(likeBlog(id))
    } catch (error) {
      console.error(error.message)
    }
  }

  const handleDelete = async (event) => {
    event.preventDefault()

    const id = event.target.id
    try {
      dispatch(deleteBlog(id))
      window.alert(`Removed blog ${blog.title} by ${blog.author}`)
    } catch (exception) {
      console.error(exception.message)
    }
  }
  return(
    <div style={blogStyle}>
      <div style={hiddenWhenVisible}>
        <Link to={`/blogs/${blog.id}`} >
          {blog.title} {blog.author}
        </Link>
        <button onClick={toggleVisibility}>view</button>
      </div>
      <div id="fullBlog" className='togglableContent' style={showWhenVisible}>
        <button onClick={toggleVisibility}>hide</button>
        <p>{blog.title}: {blog.author}</p>
        <p>{blog.url}</p>
        <p id="likes">
          likes {blog.likes}
          <button id={blog.id} onClick={handleLike}>like</button>
        </p>
        <p>{blog.user.name}</p>
        <button id={blog.id} onClick={handleDelete}>remove</button>
      </div>
    </div>
  )
}

export default Blog
