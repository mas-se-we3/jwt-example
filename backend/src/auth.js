const jwt = require('jsonwebtoken')
const { users, userRoles } = require('./data')

function secureWithToken(req, res, next) {
	const authHeader = req.headers['authorization']
	const token = authHeader && authHeader.split(' ')[1]
	if (token == null) return res.sendStatus(401)

	jwt.verify(token, process.env.TOKEN_SECRET, (err, token) => {
		if (err) return res.sendStatus(403)
		req.token = token
		next()
	})
}

function generateAccessToken(payload) {
	return jwt.sign(payload, process.env.TOKEN_SECRET, { expiresIn: '1800s' })
}

function login(username, password) {
	console.log(username, password)
	const user = users.find(
		u => u.username === username && u.password === password
	)

	if (!user) return

	return userRoles.find(ur => ur.username === user.username)
}

module.exports = {
	secureWithToken,
	generateAccessToken,
	login
}
