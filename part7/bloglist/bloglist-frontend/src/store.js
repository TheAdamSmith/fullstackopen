import { createStore, combineReducers, applyMiddleware } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import thunk from 'redux-thunk'
import blogReducer from './reducers/blogReducer'
import loginReducer from './reducers/loginReducer'
import userReducer from './reducers/loginReducer'

import notificationReducer from './reducers/notificationReducer'

const reducer = combineReducers({
  notification: notificationReducer,
  blogs: blogReducer,
  loggedUser: loginReducer,
  users: userReducer,
})

const store = createStore(
  reducer,
  composeWithDevTools(
    applyMiddleware(thunk)
  )
)

export default store