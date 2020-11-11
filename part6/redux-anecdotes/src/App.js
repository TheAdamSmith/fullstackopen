import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import AnecdoteForm from './components/AnecdoteForm'
import AnecdoteList from './components/AnecdoteList'
import Notification from './components/Notification'
import { initlizeAnecdotes } from './reducers/anecdoteReducer'

const App = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(initlizeAnecdotes())
  }, [dispatch])

  return (
    <div>
      <Notification/>
      <AnecdoteList/>
      <AnecdoteForm />
    </div>
  )
}

export default App