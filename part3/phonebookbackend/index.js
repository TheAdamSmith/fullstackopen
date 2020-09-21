const express = require('express')
const morgan = require('morgan')
const app = express()
const cors = require('cors')
const bodyParser = require('body-parser')
require('dotenv').config()
const Person = require('./models/person')

morgan.token('body', function (req) { return JSON.stringify(req.body) })
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'))
app.use(express.json())
app.use(express.static('build'))
app.use(bodyParser.json())
app.use(cors())



app.get('/', (request, response) =>{
	response.send('<h1> Hello World!</h1>')
})

app.get('/api/persons', (request, response) => {
	Person.find({}).then(people => {
        
		response.json(people.map( person => person.toJSON()))
	})

})

app.get('/info', (request, response) => {   
	Person.countDocuments({}).then( numPersons => {
		response.send(`<p>Phone book has info for ${numPersons} people</p>
        <p>${new Date()}</p>`)
	}
	)
})

app.get('/api/persons/:id', (request, response, next) => {
	Person.findById(request.params.id).then( person => {
		if (person){
			response.json(person.toJSON())
		} else {
			response.status(404).end()
		}
	}) 
		.catch(error => next(error))
    
})

app.delete('/api/persons/:id', (request, response, next) => {
	Person.findByIdAndRemove(request.params.id)
		.then(result => {
			response.status(204).end()
		})
		.catch(error => next(error))
})

app.post('/api/persons', (request,  response, next) => {
	const body = request.body
	if(body.Name ===  undefined || body.Number=== undefined) {
		return response.status(400).json({error: 'content missing'})
	}
  
	const newPerson = new Person({
		Name: body.Name,
		Number: body.Number
	})
            
	newPerson.save().then(savedPerson => {
        
		response.json(savedPerson.toJSON())
	})
		.catch(error => next(error))
})

app.put('/api/persons/:id', (request, response, next) => {
	const body = request.body
	if(body.Name === undefined || body.Number === undefined) {
		response.status(400).json({ error: 'invalid content'})
	}

	const person = {
		Name: body.Name,
		Number: body.Number
	}
	Person.findByIdAndUpdate(request.params.id, person, {new: true, runValidators:true})
		.then (updatedPerson => {
			response.json(updatedPerson.toJSON())
		})
		.catch(error => next(error))
})

const unknownEndpoint = (request, response) => {
	response.status(404).send({error: 'unknown endpoint'})
}

app.use(unknownEndpoint)

const errorHandler = (error, request, response, next) => {
	console.error(error.message)

	if (error.name === 'CastError' && error.kind === 'ObjectId') {
		return response.status(400).send({error: 'malformatted id'})
	} else if (error.name === 'ValidationError'){
		return response.status(400).json({error: error.message})
	}

	next (error)
}

app.use(errorHandler)

const PORT = process.env.PORT || 3001

app.listen(PORT, () => {
	console.log(`server running on port ${PORT}`)
})

