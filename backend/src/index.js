const express = require('express')
const bodyParser = require('body-parser')
const { secureWithToken, generateAccessToken, login } = require('./auth')
const { todos } = require('./data')
const dotenv = require('dotenv')

dotenv.config()

const port = process.env.PORT || 8080
const app = express()

app.use(bodyParser.json())

app.post('/api/token', (req, res) => {
	const { username, password } = req.body

	const payload = login(username, password)
	if (!payload) return res.sendStatus(401)
	const token = generateAccessToken(payload)

	res.json(token)
})

app.get('/api/todos', secureWithToken, (req, res) => {
	res.send(todos.filter(t => t.owner === req.token.username))
})

app.get('/api/motd', (req, res) => {
	res.send("It's a beautiful day")
})

app.listen(port)
console.log('Server started on port ' + port)
