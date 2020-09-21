import React from 'react'

const Notification = ({ message, error }) => {
    
   if(error){
    return (
        <div className="error">
        {error}
        </div>
    )
  }
  if(message){
    return (
        <div className="notification">
        {message}
        </div>
    )
  }
  return null
}

export default Notification