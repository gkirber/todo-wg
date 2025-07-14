import { host } from '../script.js'

export async function addTodo(newTodo) {
	try {
		const response = await fetch(`${host}`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(newTodo),
		})

		if (!response.ok) {
			throw new Error(`Failed to add task. Status: ${response.status}`)
		}

		console.log('Task added')
		return await response.json()
	} catch (error) {
		console.error(`Error adding:`, error.message)
		throw error
	}
}
