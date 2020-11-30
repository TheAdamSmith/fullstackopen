import React, { useEffect, useRef } from 'react'
import {
  useDispatch,
  useSelector
} from 'react-redux'
import {
  Route,
  Switch,
  Link,
  useRouteMatch
} from 'react-router-dom'

import Blog from './components/Blog'
import BlogDetailed from './components/BlogDetailed'
import User from './components/User'
import UserDetailed from './components/UserDetailed'
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
  const blogFormRef = useRef()

  const userMatch = useRouteMatch('/users/:id')
  const user2Show = userMatch
    ? users.find(user => user.id === userMatch.params.id)
    : null

  const blogMatch = useRouteMatch('/blogs/:id')
  const Blog2Show = blogMatch
    ? blogs.find(blog => blog.id === blogMatch.params.id)
    : null

  useEffect(() => {
    dispatch(initializeBlogs())

    dispatch(initializeUsers('test'))

    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')

    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      dispatch(setUser(user))
    }
  }, [dispatch])


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

  const userList = () => {
    return (
      <table>
        <tbody>
          <tr>
            <th>Username</th>
            <th>Blogs Created</th>
          </tr>
          {users.map( user => (
            <User
              key={user.id}
              user={user}
            />
          ))}
        </tbody>
      </table>
    )
  }

  const padding = {
    padding: 5
  }
  return (
    <div>
      <div>
        <Link style={padding} to="/blogs">blogs</Link>
        <Link style={padding} to="/users">users</Link>
      </div>
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
          <Switch>
            <Route path="/blogs/:id">
              <BlogDetailed blog={Blog2Show}/>
            </Route>
            <Route path="/blogs">
              {blogForm}
            </Route>
            <Route path="/users/:id">
              <UserDetailed user={user2Show}/>
            </Route>
            <Route path="/users">
              {userList}
            </Route>
          </Switch>
        </div>
      }
    </div>
  )
}

export default App