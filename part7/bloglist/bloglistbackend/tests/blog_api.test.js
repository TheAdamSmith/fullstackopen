const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const helper = require('./api_test_helper')
const Blog = require('../models/blog')
const User = require('../models/user')

const api = supertest(app)

beforeEach(async () =>{
    await Blog.deleteMany({})
    await User.deleteMany({})
    const response = 
        await api
        .post('/api/users/')
        .send(helper.initialUser)

    user = response.body
    for(let blog of helper.initialBlogs) {
        let blogObject = new Blog(blog)
        blogObject.user = user.id
        await blogObject.save()
    }
})

describe('api', ()=> {
    test('blogs are returned as json', async () => {
    const response = await api
        .get('/api/blogs')
        .expect(200)
        .expect('Content-Type', /application\/json/)
    })



    test('blogs are return 1 blog', async () => {
        const response = await api.get('/api/blogs')
        response.body.map(blog => expect(blog.id).to)
        
    })
    

    test('blog id is defined', async () => {
        const response = await api.get('/api/blogs')

        response.body.map(blog =>
            expect(blog.id.toBeDefined))
    })

    test('a user can login with token', async () => {
        const reponse = 
            await api
            .post('/api/login')
            .send(helper.initialUser)
            .expect(200)
            .expect('Content-Type', /application\/json/)

        const logUser = reponse.body     

        expect(logUser.token).toBeTruthy();
    })
    test('post adds a new blog', async () => {
        const response = 
            await api
            .post('/api/login')
            .send(helper.initialUser)
            .expect(200)
            .expect('Content-Type', /application\/json/)
        const logUser = response.body

        const newBlog  = {title: "New Blog", author: "test", url: "https://reactpatterns.com/", likes: 6}
        await api
            .post('/api/blogs')
            .set({'Authorization': `bearer ${logUser.token}`})
            .send(newBlog)
            .expect(200)
            .expect('Content-Type', /application\/json/)

        const blogsAtEnd = await helper.blogsInDb()
        expect(blogsAtEnd.length).toBe(helper.initialBlogs.length+1)

        const authors = blogsAtEnd.map(blog => blog.author)
        expect(authors).toContain('test')
    })

    test('blog with no likes gets zero likes', async () => {
        const reponse = 
            await api
            .post('/api/login')
            .send(helper.initialUser)
            .expect(200)
            .expect('Content-Type', /application\/json/)
        const logUser = reponse.body

        const newBlog  = {title: "New Blog", author: "test", url: "https://reactpatterns.com/"}
        await api
            .post('/api/blogs')
            .set({'Authorization': `bearer ${logUser.token}`})
            .send(newBlog)
            .expect(200)
            .expect('Content-Type', /application\/json/)

        const blogsAtEnd = await helper.blogsInDb()
        expect(blogsAtEnd[blogsAtEnd.length-1].likes).toBe(0)
    })

    test('missing content returns 400', async () => {
        let newBlog  = { author: "test", url: "https://reactpatterns.com/"}
        await api
            .post('/api/blogs')
            .send(newBlog)
            .expect(400)

        newBlog  = {title:"test", author: "test"}

        await api
            .post('/api/blogs')
            .send(newBlog)
            .expect(400)
    })

    test('a blog can be deleted', async () => {

        const reponse = 
            await api
            .post('/api/login')
            .send(helper.initialUser)
            .expect(200)
            .expect('Content-Type', /application\/json/)
        const logUser = reponse.body

        const blogsAtStart = await helper.blogsInDb()
        const blogToDelete = blogsAtStart[0]

        await api
          .delete(`/api/blogs/${blogToDelete.id}`)
          .set({'Authorization': `bearer ${logUser.token}`})
          .expect(204)
      
        const blogsAtEnd = await helper.blogsInDb()
      
        expect(blogsAtEnd.length).toBe(
          helper.initialBlogs.length - 1
        )
      
        const titles = blogsAtEnd.map(r => r.title)
      
        expect(titles).not.toContain(blogToDelete.title)
    })
    test('a blog can be updated', async () => {
        const blogsAtStart = await helper.blogsInDb()
        const blogToUpdate = blogsAtStart[0]
        blogToUpdate.title = 'test'
        blogToUpdate.likes = 999
        await api
          .put(`/api/blogs/${blogToUpdate.id}`)
          .send(blogToUpdate)
          .expect(200)
          .expect('Content-Type', /application\/json/)
      
        const blogsAtEnd = await helper.blogsInDb()
      
        expect(blogsAtEnd[0].likes).toBe(999)
        
        expect(blogsAtEnd[0].title).toBe('test')
      
      
    })
    afterAll(() => {
    mongoose.connection.close()
    })
})