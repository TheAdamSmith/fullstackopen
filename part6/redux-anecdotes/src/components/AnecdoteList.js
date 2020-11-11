import React from 'react'
import Filter from './Filter'
import { useDispatch, useSelector } from 'react-redux'
import { voteAction } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer'

const AnecdoteList = () => {

  let anecdotes = useSelector(state => state.anecdotes)
  console.log('in anecdote list', anecdotes)
  const filter = useSelector(state => state.filter)
  const dispatch = useDispatch()

  const vote = (id) => {
    const anecdote = anecdotes.find(anecdote => anecdote.id===id)
    dispatch(voteAction(anecdote))
    dispatch(setNotification(`you voted ${anecdote.content}`, 5))
  }
  if (anecdotes) {
    anecdotes = anecdotes.filter(anecdote =>
      anecdote.content.startsWith(filter)
    )
  }
  anecdotes = anecdotes.sort((a, b) => b.votes-a.votes)
  console.log('after sort', anecdotes)
  return(
    <div>
      <h2>Anecdotes</h2>
      <Filter/>
      {anecdotes.map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => vote(anecdote.id)}>vote</button>
          </div>
        </div>
      )}
    </div>
  )
}

export default AnecdoteList