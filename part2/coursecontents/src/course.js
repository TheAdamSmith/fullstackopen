import React from 'react';

const Header = ({ course }) => {
    return (
      <h2>{course.name}</h2>
    )
  }
  
  const Total = ({parts}) => {
    return (
      <b>
        Total of {parts.reduce((sum, part) => sum+part.exercises, 0)} exercises
      </b>
    )
  }
  
  const Part = (props) => {
    return (
      <p>
        {props.part.name} {props.part.exercises}
      </p>    
    )
  }
  
  
  
  const Course = ({course}) => {
  
    return (
      <div>
        <Header  course={course}/>
          {course.parts.map(part => 
            <Part key={part.id} part={part}/>)
          }
        <Total parts={course.parts}/>
      </div>
    )
  }
  
export default Course