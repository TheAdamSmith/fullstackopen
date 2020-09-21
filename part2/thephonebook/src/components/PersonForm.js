import React from 'react'

const PersonForm = (props)  => {
    
    const {newName, newNumber, onNameChange, onNumChange, onSubmit} = props
    return (
      <form onSubmit={onSubmit}>
          <div>
            name: <input 
                    value={newName}
                    onChange={onNameChange} />
          </div>
          <div>
            number: <input 
                      value={newNumber}
                      onChange={onNumChange}/>
          </div>
          <div>
            <button type="submit">add</button>
          </div>
        </form>
    )
  }

  export default PersonForm