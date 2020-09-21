import React from 'react'
import ReactDOM from 'react-dom'


const Header = (props) => {

  return(
    <div>
      <p>Course: {props.course}</p>
    </div>
  )
}

const Content = (props) => {

  return(
  <div>
    <Part part = {props.part1} exercises = {props.exercises1}/>
    <Part part = {props.part2} exercises = {props.exercises2}/>
    <Part part = {props.part3} exercises = {props.exercises3}/>
  </div>
  )
}



const Part = (props) => {
  return(
    <div>
      <p> Part: {props.part} Exercises: {props.exercises}</p>
    </div>
  )

}

const Total = (props) =>{

  return(
  <div>
    <p> 
      Total: {props.exercises1+props.exercises2 + props.exercises3}
    </p>
  </div>
  )
}

const App = () => {

  const course = {
    name: 'Half Stack application Development',
    parts: [
      {
      name:'Fundamentals of React',
      exercise: 10
      },
      {
      name:'Using props to pass data',
      exercise: 7
      },
      {
      name:  'State of a component',
      exercise: 14
    }
    ]
  }
  return (
    <div>
      <Header course={course.name}/>
     < Content part1 = {course.parts[0].name} part2 = {course.parts[1].name} part3 = {course.parts[2].name} exercises1 = {course.parts[0].exercise} exercises2 = {course.parts[1].exercise} exercises3 = {course.parts[2].exercise}/>
      <Total exercises1 = {course.parts[0].exercise} exercises2 = {course.parts[1].exercise} exercises3 = {course.parts[2].exercise}/>
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))