import React from 'react'

const UserDetailed = ({
  user
}) => {
  console.log(user)
  if (!user) {
    return null
  }
  return (
    <div>
      <h2>{user.name}</h2>
      <h3>added blogs</h3>
      <ol>
        {user.blogs.map(blog => (
          <li key={blog.id}>{blog.title}</li>
        ))}
      </ol>
    </div>
  )
}

export default UserDetailed