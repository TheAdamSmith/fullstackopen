import React, { useState, useEffect} from 'react'
import personService from './services/persons'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import Notification from './components/Notification'
import './index.css'

const generateId = (ids) => {
  ids.sort()
  return (
    ids.reduce(function(newId, id) {
      return newId===id? id+1:newId
    }, 1)
  )
}

const App = () => {
  const [ persons, setPersons ] = useState([]) 
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber] = useState('')
  const [ filter, setnewFilter] = useState('')
  const [notification, setNotification] = useState(null) 
  const [error, setError] = useState(null)

  useEffect(() => {
   personService
    .getAll() 
    .then(initialPersons =>
      setPersons(initialPersons))
  }, [])

  const addName=(event) => {
    event.preventDefault()
    const nameList = persons.map(person => person.name)
    const personObject = {
      name: newName,
      number: newNumber,
      id:0,
    }

    if (nameList.includes(newName)){
      if(window.confirm(newName+' already exists. Replace?')){
        personObject.id = persons[nameList.indexOf(newName)].id
        personService
          .update(personObject)
          .then()
          .catch(error => {
            setError(`Information of ${personObject.name} has been removed  from server`)
            setTimeout(() => {
              setError(null)
            }, 5000)
          })
        setPersons(persons.map(person => person.name ===newName? personObject: person))
      }
        
    } else{
      personObject.id = generateId(persons.map(person=>person.id))

      personService
        .create(personObject)
        .then(returnedPerson => {
          setPersons(persons.concat(returnedPerson))
          setNewNumber('')
          setNewName('')
          setNotification('Added '+ personObject.name)
          setTimeout(()=>{
            setNotification(null)
          }, 5000)
        }) 
    }
  
  
  }

  const handleNameChange = (event) => { 
    event.preventDefault()
    setNewName(event.target.value)
  }

  const handleNumChange = (event) => { 
    event.preventDefault()
    setNewNumber(event.target.value)
  }

  const handleFilterChange = (event) => { 
    event.preventDefault()
    setnewFilter(event.target.value)
  }

  const handleDelete = (person) => {
    if(window.confirm('Delete '+person.name+'?')){
      personService
        .remove(person)
        .then()
        .catch(
          error => {
            setError(`Information of ${person.name} has been removed  from server`)
            setTimeout(() => {
              setError(null)
            }, 5000)
          }
        )
      setPersons(persons.filter(personIter => personIter !==person ))
    }
  }
 
  
  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={notification} error={error} />
      <Filter filter={filter} onChange={handleFilterChange}/> 

      <h3>add a new</h3>

      <PersonForm newName={newName} newNumber={newNumber}
                  onNameChange={handleNameChange} onNumChange={handleNumChange} 
                  onSubmit={addName}/>
    
      <h3>Numbers</h3>

      <Persons persons={persons} filter={filter} onClick={handleDelete}/>
      
    </div>
  )
}
export default App