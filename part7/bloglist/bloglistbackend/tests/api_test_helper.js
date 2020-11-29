const Blog = require('../models/blog')
const User = require('../models/user')

const initialBlogs = [ 
    { _id: "5a422a851b54a676234d17f7", title: "react patterns", author: "michael chan", url: "https://reactpatterns.com/", likes: 6, __v: 0 }, 
    { _id: "5a422aa71b54a676234d17f8", title: "go to statement considered harmful", author: "edsger w. dijkstra", url: "http://www.u.arizona.edu/~rubinson/copyright_violations/go_to_considered_harmful.html", likes: 5, __v: 0 }, 
]

const initialUser = {username: 'secretUsername', name: 'john doe', password: 'password'}

const nonExistingId = async () => {
    const blog = new Blog({ content: 'willremovethissoon' })
    await blog.save()
    await blog.remove()
  
    return blog._id.toString()
  }
  
const blogsInDb = async () => {
  const blogs = await Blog.find({})
  return blogs.map(blog => blog.toJSON())
}

const usersInDb = async () => {
  const users = await User.find({})
  return users.map(u => u.toJSON())
}

module.exports = {
    initialBlogs,
    initialUser,
    nonExistingId,
    blogsInDb,
    usersInDb

}