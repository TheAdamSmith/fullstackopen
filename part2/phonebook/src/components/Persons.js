import React from 'react'

const Persons = ({persons, filter, onClick}) => {

    const filtPersons = persons.filter(person => person.name.startsWith(filter))

    return (
        filtPersons.map(person => 
        <p key={person.name}> {person.name} {person.number}
        <button key={person.name} onClick={() => onClick(person)}>delete</button>
        </p>)
    )
}

export default Persons