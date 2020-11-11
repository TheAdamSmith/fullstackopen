import React from 'react'
import Filter from './Filter'
import { voteAction } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer'
import { connect } from 'react-redux'

const AnecdoteList = (props) => {

  const vote = (id) => {
    const anecdote = props.anecdotes.find(anecdote => anecdote.id===id)
    props.voteAction(anecdote)
    props.setNotification(`you voted ${anecdote.content}`, 5)
  }

  return(
    <div>
      <h2>Anecdotes</h2>
      <Filter/>
      {props.anecdotes.map(anecdote =>
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

const mapDispatchToProps = {
  voteAction,
  setNotification,
}
const mapStateToProps = (state) => {

  const sortedAnecdotes = state.anecdotes.sort((a, b) => b.votes-a.votes)
  return ({
    anecdotes: sortedAnecdotes.filter(anecdote =>
      anecdote.content.startsWith(state.filter)
    )
  })
}
const ConnectedAnecdoteList = connect(
  mapStateToProps,
  mapDispatchToProps
)(AnecdoteList)

export default ConnectedAnecdoteList