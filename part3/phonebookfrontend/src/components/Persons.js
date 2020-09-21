import React from 'react'

const Persons = ({persons, filter, onClick}) => {

    const filtPersons = persons.filter(person => person.Name.startsWith(filter))

    return (
        filtPersons.map(person => 
        <p key={person.Name}> {person.Name} {person.Number}
        <button key={person.Name} onClick={() => onClick(person)}>delete</button>
        </p>)
    )
}

export default Persons