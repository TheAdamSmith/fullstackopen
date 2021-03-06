import React, { useState } from 'react'

const Blog = ({
  blog,
  handleLike,
  handleDelete
}) => {
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
  }

  const [visible, setVisible] = useState(false)

  const hiddenWhenVisible = { display: visible ? 'none' : '' }
  const showWhenVisible = { display: visible ? '' : 'none' }

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  return(
    <div style={blogStyle}>
      <div style={hiddenWhenVisible}>
        {blog.title} {blog.author}
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
