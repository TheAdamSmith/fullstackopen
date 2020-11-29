import React from 'react'

const Notification = ({ message }) => {
  if (message === '') {
    return null
  }

  return (
    <div className ="notification">
      {message}
    </div>
  )
}

const ErrorMessage = ({ message }) => {
  if (message === '') {
    return null
  }

  return (
    <div className ="error">
      {message}
    </div>
  )
}
export { Notification, ErrorMessage }

