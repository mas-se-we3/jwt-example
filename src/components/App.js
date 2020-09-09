import React, { Component } from 'react'
import './App.css'
import { TodoList } from './TodoList'

class App extends Component {
	state = {
		token: '',
		username: 'tobi',
		password: 'foobar',
		todos: []
	}

	async componentDidUpdate(prevProps, prevState) {
		const { token } = this.state

		if (token && token !== prevState.token) {
			const headers = new Headers()
			headers.append('content-type', 'application/json')
			headers.append('authorization', `Bearer ${token}`)
			const response = await fetch('/api/todos', { headers })
			const todos = await response.json()
			this.setState({ todos })
		}
	}

	render() {
		const { token, username, password, todos } = this.state

		if (token) {
			return (
				<div className="app__container">
					<h1>My Todos</h1>
					<TodoList todos={todos} />
				</div>
			)
		}

		return (
			<div className="app__container">
				<input
					value={username}
					onChange={event => this.setState({ username: event.target.value })}
				/>
				<input
					value={password}
					onChange={event => this.setState({ password: event.target.value })}
				/>
				<button onClick={this.login}>Login</button>
			</div>
		)
	}

	login = async () => {
		const { username, password } = this.state
		const headers = new Headers()
		headers.append('content-type', 'application/json')
		const response = await fetch('/api/token', {
			method: 'post',
			headers,
			body: JSON.stringify({ username, password })
		})
		const token = await response.json()
		this.setState({ token })
	}
}

export default App
