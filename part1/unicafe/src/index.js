import React, { useState } from 'react'
import ReactDOM from 'react-dom';

const Button = (props) => {
  const { onClick, text } = props
  return(
    <button onClick={onClick}>
      {text}
    </button>
  )
}

const Statistic = (props) => {
  const {text, value} = props  
  return (
    <tr>
      <td>{text}</td> 
      <td>{value}</td>
    </tr>
  )

}
const Statistics = (props) =>{
  const {good, neutral, bad} = props
  const all = good + neutral + bad
  const average  = (good-bad)/all
  const perPos = good/all*100
  if (all === 0){
    return (
      <div>
        <h1>statistics</h1>
        <p>no statistics given</p>
      </div>
    )
  }
  return(
    <div>
      <h1>statistics</h1>
      <table>
        <tbody>
        <Statistic text="good" value={good} />
        <Statistic text="neutral" value={neutral} />
        <Statistic text="bad" value={bad} />
        <Statistic text="all" value={all} />
        <Statistic text="average" value={average} />
        <Statistic text="positive" value={perPos} />
      </tbody>
      </table>
    </div>
  )

}


const App = (props) => {
  
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const handleGoodClick = () => {    
    setGood(good + 1)
  }

  const handleNeutralClick = () => {    
    setNeutral(neutral + 1)
  }

  const handleBadClick = () => {    
    setBad(bad + 1)
  }


  return (
    <div>
      <div>
          <h1>give feedback</h1>
          <Button onClick={handleGoodClick} text='good' />        
          <Button onClick={handleNeutralClick} text='neutral' />
          <Button onClick={handleBadClick} text='bad' />
          <Statistics good={good} neutral={neutral} bad={bad}/>
      </div>
   </div>
  )
}
ReactDOM.render(<App />, document.getElementById('root'))