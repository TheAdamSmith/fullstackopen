const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')

mongoose.set('useFindAndModify', false)
mongoose.set('useCreateIndex', true)
const url = process.env.MONGODB_URI

console.log('connecting to MongoDB')

mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true})
	.then(result => {
		console.log('connected to MongoDB')
	})
	.catch((error) =>  {
		console.log('error connecting to MongoDb:', error.message)
		console.log(url)
        
        
	})

const personSchema = new mongoose.Schema({
	Name: {type: String, required: true, unique: true, minlength: 3},
	Number: {type: String, required: true, minlength: 8}
})

personSchema.plugin(uniqueValidator)

personSchema.set('toJSON', {
	transform: (document, returnedObject) => {
		returnedObject.id = returnedObject._id.toString()
		delete returnedObject._id
		delete returnedObject.__v
	}
})

module.exports = mongoose.model('Person', personSchema)
