
export const setNotification = (content, duration) => {
  return async dispatch => {
    dispatch({
      type:'SET',
      content
    })
    setTimeout(() => {
      dispatch({
        type:'CLEAR',
      })
    }, duration*1000)
  }
}

export const clearNotification = () => {
  return({
    type:'CLEAR'
  })
}

const notificationReducer = (state = '', action) => {
  console.log('state now: ', state)
  console.log('action', action)
  switch(action.type) {
  case('SET'):
    return action.content
  case('CLEAR'):
    return ''
  default:
    return state
  }
}

export default notificationReducer