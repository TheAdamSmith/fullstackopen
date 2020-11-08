import React, { useState } from 'react'

const NewBlogForm = ({
  createNewBlog,
}) => {
  const emptyBlog = {
    title: '',
    author: '',
    url: ''
  }
  const [newBlog, setNewBlog] = useState(emptyBlog)

  const createBlog = (event) => {
    event.preventDefault()
    createNewBlog(newBlog)

    setNewBlog(emptyBlog)
  }

  return (
    <div id="newBlogForm">
      <h2>create new</h2>
      <form onSubmit={createBlog}>
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