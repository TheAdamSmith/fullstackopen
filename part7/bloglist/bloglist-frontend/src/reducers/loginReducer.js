import loginService from '../services/login'
import blogService from '../services/blogs'
import { setError } from './notificationReducer'

const loginReducer = (
  state = null, action) => {
  switch (action.type) {
  case('LOGIN'):
    return action.user
  case ('LOGOUT'):
    return null
  default:
    return state
  }

}

export const login = (username, password) => {
  return async (dispatch) => {
    try {

      const user = await loginService.login({
        username,
        password
      })

      window.localStorage.setItem(
        'loggedBlogappUser', JSON.stringify(user)
      )

      blogService.setToken(user.token)
      dispatch({
        type: 'LOGIN',
        user
      })
    } catch (error) {
      dispatch(setError('invalid credentials', 5))
    }
  }
}

export const setUser = (user) => {
  return async (dispatch) => {
    blogService.setToken(user.token)
    dispatch({
      type: 'LOGIN',
      user
    })
  }
}

export const logout = () => {
  return ({
    type: 'LOGOUT'
  })
}

export default loginReducer
