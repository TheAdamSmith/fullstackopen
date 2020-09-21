const blogsRouter = require('express').Router()
const Blog = require('../models/blog')

blogsRouter.get('/', async (request, response) => {

  const blogs = await Blog.find({})
  response.json(blogs.map(blog => blog.toJSON()))
})
  
blogsRouter.post('/', async (request, response) => {
    const blog = new Blog(request.body)
    if(!blog.title || !blog.url) {
      response.status(400).end()
    }
    if(!blog.likes){
      blog.likes=0
    } 
    const savedBlog = await blog.save()
    response.json(savedBlog.toJSON())
  })

blogsRouter.delete('/:id', async (request, response) => {
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