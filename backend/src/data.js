const users = [
	{ username: 'tobi', password: 'foobar' },
	{ username: 'patrik', password: 'welcome' }
]

const userRoles = [
	{ username: 'tobi', roles: ['admin', 'programmer'] },
	{ username: 'patrik', roles: ['big boss'] }
]

const todos = [
	{
		id: 1,
		title: 'Wash clothes',
		owner: 'tobi'
	},
	{
		id: 2,
		title: 'Vacuum the floor',
		owner: 'tobi'
	},
	{
		id: 3,
		title: 'Read a good book',
		owner: 'patrik'
	},
	{
		id: 4,
		title: 'Go to sleep',
		owner: 'patrik'
	}
]

module.exports = {
	users,
	userRoles,
	todos
}
