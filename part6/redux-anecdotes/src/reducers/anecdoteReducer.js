import anecdoteService from '../services/anecdotes'

export const voteAction = (anecdote) => {
  anecdote.votes++

  return async dispatch => {
    const newAnecdote = await anecdoteService.update(anecdote)
    dispatch({
      type:'VOTE',
      data: newAnecdote
    })
  }
}

export const createAnecdote = (content) => {

  return async dispatch => {
    const anecdote = await anecdoteService.createNew(content)
    console.log(anecdote)
    dispatch({
      type:'NEW_ANECDOTE',
      data: anecdote
    })
  }
}

export const initlizeAnecdotes = () => {
  return async dispatch => {
    const anecdotes = await anecdoteService.getAll()
    dispatch({
      type:'INIT_ANECDOTES',
      data: anecdotes
    })

  }
}

const anecdoteReducer = (state = [], action) => {
  console.log('state now: ', state)
  console.log('action', action)
  switch(action.type) {

  case('VOTE'):
    return state.map(anecdote =>
      action.id === anecdote.id ?
        action.data
        : anecdote)
  case('NEW_ANECDOTE'):
    return [...state, action.data]
  case('INIT_ANECDOTES'):
    return action.data
  default:
    return state
  }
}

export default anecdoteReducer