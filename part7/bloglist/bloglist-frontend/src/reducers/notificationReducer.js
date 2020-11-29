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
    dispatch({
      type: 'SET_TIMEOUT',
      id: timeoutId
    })
  }
}

export const setError = (content, duration) => {
  return async dispatch => {
    dispatch({
      type:'SET_ERROR',
      content
    })
    dispatch({
      type: 'CLEAR_TIMEOUT'
    })
    const timeoutId = setTimeout(() => {
      dispatch({
        type:'CLEAR_ERROR',
      })
    }, duration*1000)
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

const notificationReducer = (state = { notification:'', error:'', timeoutIds:[] }, action) => {
  switch(action.type) {
  case('SET_NOTIFICATION'):
    return { ...state, notification:action.content }
  case('CLEAR_NOTIFICATION'):
    return { ...state, notification:'' }
  case('SET_ERROR'):
    return { ...state, error:action.content }
  case('CLEAR_ERROR'):
    return { ...state, error:'' }
  case('SET_TIMEOUT'):
  {
    const ids = [...state.timeoutIds, action.id]
    return { ...state, timeoutIds:ids }
  }
  case('CLEAR_TIMEOUT'):
  {
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