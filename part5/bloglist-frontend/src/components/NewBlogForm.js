import React from 'react'

const NewBlogForm = ({
  handleSubmit,
  handleTitleChange,
  handleAuthorChange,
  handleUrlChange,
  newBlog,
}) => {
  return (
    <div>
      <h2>create new</h2>
      <form onSubmit={handleSubmit}>
        <div>
            title:
          <input
            value={newBlog.title}
            onChange={handleTitleChange}
          />
        </div>
        <div>
            author:
          <input
            value={newBlog.author}
            onChange={handleAuthorChange}
          />
        </div>
        <div>
            url:
          <input
            value={newBlog.url}
            onChange={handleUrlChange}
          />
        </div>
        <button type="submit">create</button>
      </form>
    </div>
  )
}

export default NewBlogForm