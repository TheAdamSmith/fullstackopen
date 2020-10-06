const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')
const jwt = require('jsonwebtoken')

blogsRouter.get('/', async (request, response) => {

  const blogs = await Blog
    .find({})
    .populate('user', {username: 1, name: 1})

  response.json(blogs.map(blog => blog.toJSON()))
})
  
blogsRouter.post('/', async (request, response) => {
    const body = request.body

    if(!body.title || !body.url) {
      return response.status(400).end()
    }
    
    const decodedToken = jwt.verify(request.token, process.env.SECRET)

    if(!decodedToken.id){
      return response.status(401).json({error: 'token missing or invalid'})
    }

    const user = await User.findById(decodedToken.id)

    const blog = new Blog({
      title: body.title,
      author: body.author ? body.author: "",
      url: body.url,
      likes: body.likes ? body.likes : 0,
      user: user._id
    })

    const savedBlog = await blog.save()
    user.blogs = user.blogs.concat(savedBlog._id)

    await user.update()

    return response.json(savedBlog.toJSON())
  })

blogsRouter.delete('/:id', async (request, response) => {

  const decodedToken = jwt.verify(request.token, process.env.SECRET)
  if(!decodedToken.id){
    response.send(401).json({error: 'invalid or missing token'})
  }
  const userId = decodedToken.id
  const blog = await Blog.findById(request.params.id)

  if(blog.user.toString() !== userId.toString()){
    response.send(401).json({error: 'invalide or missing token'})
  }

  await Blog.findByIdAndRemove(request.params.id)
  response.status(204).end()
})

blogsRouter.put('/:id', async (request, response, next) => {
  const body = request.body
  if(!body.title || !body.url) {
    response.status(400).end()
  }

  const blog = {
    title: body.title,
    author: body.author || '',
    url: body.url,
    likes: body.likes || 0,
  }

  const updatedNote = await Blog.findByIdAndUpdate(request.params.id, blog, { new: true })
  response.json(updatedNote.toJSON())
})



  module.exports = blogsRouter