import { host } from '../script.js'

export async function updateTodo(id, newText) {
	try {
		const response = await fetch(`${host}/${id}`, {
			method: 'PUT',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({ text: newText }),
		})

		if (!response.ok) {
			throw new Error(`Failed to update task. Status: ${response.status}`)
		}

		console.log('Task text updated')
		return true
	} catch (error) {
		console.error(`Error updating task text:`, error.message)
		throw error
	}
}
