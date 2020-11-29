import blogService from '../services/blogs'

const blogReducer = (state = [], action) => {
  switch(action.type) {
  case ('INIT_BLOGS'):
    return action.data
  case ('CREATE_BLOG'):
  {
    return [...state, action.data]
  }
  case ('LIKE_BLOG'):
  {
    return (state.map( blog => {
      return (blog.id === action.data.id ?
        action.data :
        blog
      )
    }))
  }
  case ('DELETE_BLOG'):
    return state.filter( blog => blog.id !== action.id)
  default:
    return state
  }
}

export const initializeBlogs = () => {
  return async (dispatch) => {
    const blogs = await blogService.getAll()
    dispatch({
      type: 'INIT_BLOGS',
      data: blogs
    })
  }
}

export const createBlog = (blog) => {
  return async (dispatch) => {
    const createdBlog = await blogService.create(blog)
    dispatch({
      type: 'CREATE_BLOG',
      data: createdBlog
    })
  }
}

export const likeBlog = (id) => {
  return async (dispatch, getState) => {
    const blogs = getState().blogs

    let blog2Update = blogs.find(blog => blog.id===id)
    blog2Update.likes++
    const updatedBlog = await blogService.update(blog2Update)
    dispatch({
      type: 'LIKE_BLOG',
      data: updatedBlog
    })
  }
}

export const deleteBlog = (id) => {
  return async (dispatch, getState) => {
    const blogs = getState().blogs
    const blog2Remove = blogs.find(blog => blog.id===id)
    window.confirm(`Remove blog ${blog2Remove.title} by ${blog2Remove.author}`)
    await blogService.deleteBlog(blog2Remove)
    dispatch({
      type: 'DELETE_BLOG',
      id: id
    })
  }
}

export default blogReducer