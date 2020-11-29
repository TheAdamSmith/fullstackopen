import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { setNotification } from '../reducers/notificationReducer'
import { createBlog } from '../reducers/blogReducer'
const NewBlogForm = ({
  blogFormRef
}) => {
  const dispatch = useDispatch()
  const emptyBlog = {
    title: '',
    author: '',
    url: ''
  }
  const [newBlog, setNewBlog] = useState(emptyBlog)

  const addBlog = (event) => {
    event.preventDefault()
    try {
      dispatch(createBlog(newBlog))
      dispatch(setNotification(`created ${newBlog.title} by ${newBlog.author}`, 5))
      blogFormRef.current.toggleVisibility()
    } catch (exception) {
      console.error(exception.message)
    }
    setNewBlog(emptyBlog)
  }

  return (
    <div id="newBlogForm">
      <h2>create new</h2>
      <form onSubmit={addBlog}>
        <div>
            title:
          <input
            id='title'
            value={newBlog.title}
            onChange={({ target }) => setNewBlog({
              ...newBlog,
              title: target.value
            })}
          />
        </div>
        <div>
            author:
          <input
            id='author'
            value={newBlog.author}
            onChange={({ target }) => setNewBlog({
              ...newBlog,
              author: target.value
            })}
          />
        </div>
        <div>
            url:
          <input
            id='url'
            value={newBlog.url}
            onChange={({ target }) => setNewBlog({
              ...newBlog,
              url: target.value
            })}
          />
        </div>
        <button type="submit">create</button>
      </form>
    </div>
  )
}

export default NewBlogForm