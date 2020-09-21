import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Button = (props) => {
  const { onClick, text } = props
  return(
    <button onClick={onClick}>
      {text}
    </button>
  )
}


const App = (props) => {
  const [selected, setSelected] = useState(0)
  const [votes, setVotes] = useState(Array.apply(null, Array(anecdotes.length)).map(Number.prototype.valueOf,0))
  const [maxIndex, setMaxIndex] = useState(0)
  const [maxVotes, setMaxVotes] = useState(0)

  const generateNext = () => {    
    setSelected(Math.floor(Math.random()*10)%anecdotes.length)
  }

  const handleVote = () => {
    const temp = {...votes}
    temp[selected] +=1
    setVotes(temp)

    if (temp[selected]>maxVotes){
      setMaxVotes(temp[selected])
      setMaxIndex(selected)
    } 
    
  }
  return (
    <div>
      <p>{props.anecdotes[selected]}</p>
      <Button onClick = {handleVote} text='vote'/> 
      <Button onClick = {generateNext} text='next anecdote'/> 
      <p>{votes[selected]}</p>
      <h1>Anecdote with most votes</h1>
      <p>{anecdotes[maxIndex]}</p>
      <p>has {votes[maxIndex]} votes </p>
    </div>
 )
}

const anecdotes = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

ReactDOM.render(
  <App anecdotes={anecdotes} />,
  document.getElementById('root')
)