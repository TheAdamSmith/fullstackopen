
export const setNotification = (content, duration) => {
  return async dispatch => {
    dispatch({
      type:'SET_NOTIFICATION',
      content
    })
    dispatch({
      type: 'CLEAR_TIMEOUT'
    })
    const timeoutId = setTimeout(() => {
      dispatch({
        type:'CLEAR_NOTIFICATION',
      })
    }, duration*1000)
    console.log(timeoutId)
    dispatch({
      type: 'SET_TIMEOUT',
      id: timeoutId
    })
  }
}

export const clearNotification = () => {
  return({
    type:'CLEAR_NOTIFICATION'
  })
}

const notificationReducer = (state = { content:'', timeoutIds:[] }, action) => {
  switch(action.type) {
  case('SET_NOTIFICATION'):
    return { ...state, content:action.content }
  case('CLEAR_NOTIFICATION'):
    return { ...state, content:'' }
  case('SET_TIMEOUT'):
  {
    const ids = [...state.timeoutIds, action.id]
    return { ...state, timeoutIds:ids }
  }
  case('CLEAR_TIMEOUT'):
  {
    console.log('made it')
    let ids = state.timeoutIds
    ids.forEach(id =>
      clearTimeout(id)
    )
    return { ...state, timeoutIds:[] }
  }
  default:
    return state
  }
}

export default notificationReducer