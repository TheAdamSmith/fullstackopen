import React, { useEffect, useRef } from 'react'
import {
  useDispatch,
  useSelector
} from 'react-redux'


import Blog from './components/Blog'
import LoginForm from './components/LoginForm'
import NewBlogForm from './components/NewBlogForm'
import Togglable from './components/Togglable'
import { Notification, ErrorMessage } from './components/Notification'
import { initializeBlogs } from './reducers/blogReducer'
import { initializeUsers } from './reducers/userReducer'
import { setUser, logout } from './reducers/loginReducer'

const App = () => {

  const dispatch = useDispatch()

  const notification = useSelector(state => state.notification.notification)
  const errorMessage = useSelector(state => state.notification.error)
  const blogs = useSelector(state => state.blogs)
  const user = useSelector(state => state.loggedUser)
  const users = useSelector(state => state.users)
  console.log(users)
  const blogFormRef = useRef()

  useEffect(() => {
    dispatch(initializeBlogs())
    dispatch(initializeUsers())
  }, [dispatch])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')

    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      dispatch(setUser(user))
    }
  }, [])


  const handleLogout = () => {
    window.localStorage.clear()
    dispatch(logout())
  }


  const loginForm = () => {
    return (
      <Togglable buttonLabel='login'>
        <LoginForm/>
      </Togglable>
    )
  }

  const blogForm = () => {

    const sortedBlogs = blogs.sort((a, b) => b.likes-a.likes)

    return(
      <div id="blogList">
        {sortedBlogs.map(blog =>
          <Blog
            key={blog.id}
            blog={blog}
          />
        )}
      </div>
    )
  }

  const createForm = () => {
    return (
      <Togglable id="newBlogToggle" buttonLabel='new blog' ref={blogFormRef}>
        <NewBlogForm
          blogFormRef
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