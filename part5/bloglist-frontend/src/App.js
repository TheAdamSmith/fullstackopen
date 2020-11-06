import React, { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import LoginForm from './components/LoginForm'
import NewBlogForm from './components/NewBlogForm'
import Togglable from './components/Togglable'
import { Notification, ErrorMessage } from './components/Notification'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const emptyBlog = {
    title: '',
    author: '',
    url: ''
  }
  const [newBlog, setNewBlog] = useState(emptyBlog)
  const [errorMessage, setErrorMessage] = useState(null)
  const [notification, setNotification] = useState(null)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)

  const blogFormRef = useRef()

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')

    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()

    try {
      const user = await loginService.login({
        username, password
      })

      window.localStorage.setItem(
        'loggedBlogappUser', JSON.stringify(user)
      )
      blogService.setToken(user.token)

      setUser(user)
      setUsername('')
      setPassword('')

    } catch (exception) {
      setErrorMessage('Invalid credentials')

      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  const handleLogout = () => {
    window.localStorage.clear()
    setUser(null)
  }

  const addBlog = async (event) => {
    event.preventDefault()

    try {
      const addedBlog = await blogService.create(newBlog)

      blogFormRef.current.toggleVisibility()
      setNewBlog(emptyBlog)
      setBlogs(blogs.concat(addedBlog))

      setNotification(`A new blog ${addedBlog.title} ${addedBlog.author}`)
      setTimeout(() => {
        setNotification(null)
      }, 5000)
    } catch (exception) {
      console.error(exception.message)
    }
  }

  const handleLike = async(event) => {
    event.preventDefault()

    const id = event.target.id
    let blog2Update = blogs.find(blog => blog.id===id)
    blog2Update.likes++

    try {
      const updatedBlog = await blogService.update(blog2Update)

      setBlogs(blogs.map(blog =>
        blog.id ===updatedBlog.id ?
          updatedBlog :
          blog
      ))
    } catch (exception) {
      console.error(exception.message)
    }
  }

  const removeBlog = async(event) => {
    event.preventDefault()

    const id = event.target.id
    const blog2Update = blogs.find(blog => blog.id===id)
    window.confirm(`Remove blog ${blog2Update.title} by ${blog2Update.author}`)
    try {
      await blogService.deleteBlog(blog2Update)
      setBlogs(blogs.filter(blog => blog.id!==id))

      window.alert(`Removed blog ${blog2Update.title} by ${blog2Update.author}`)
    } catch (exception) {
      console.error(exception.message)
    }
  }

  const loginForm = () => {
    return (
      <Togglable buttonLabel='login'>
        <LoginForm
          handleSubmit={(event) => handleLogin(event)}
          handleUsernameChange = {({ target }) => setUsername(target.value)}
          handlePasswordChange = {({ target }) => setPassword(target.value)}
          username={username}
          password={password}
        />
      </Togglable>
    )
  }

  const blogForm = () => {

    const sortedBlogs = blogs.sort((a, b) => b.likes-a.likes)

    return(
      <div>
        {sortedBlogs.map(blog =>
          <Blog
            key={blog.id}
            blog={blog}
            handleLike={handleLike}
            handleDelete={removeBlog}
          />
        )}
      </div>
    )
  }

  const createForm = () => {
    return (
      <Togglable buttonLabel='new blog' ref={blogFormRef}>
        <NewBlogForm
          handleSubmit={addBlog}
          handleTitleChange={({ target }) => setNewBlog({ ...newBlog, title: target.value })}
          handleAuthorChange={({ target }) => setNewBlog({ ...newBlog, author: target.value })}
          handleUrlChange={({ target }) => setNewBlog({ ...newBlog, url: target.value })}
          newBlog={newBlog}
        />
      </Togglable>
    )
  }

  return (
    <div>
      <h2>blogs</h2>
      <ErrorMessage message={errorMessage} />
      <Notification message={notification} />
      {user === null ?
        loginForm():
        <div>
          <p>
            {user.username} logged in
            <button onClick={handleLogout}>Logout</button>
          </p>
          {createForm()}
          {blogForm()}
        </div>
      }
    </div>
  )
}

export default App