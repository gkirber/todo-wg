import { host } from '../host.js'

export async function toggleTodoStatus(id, completed) {
	try {
		const response = await fetch(`${host}/${id}.json`, {
			method: 'PATCH',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({ completed }),
		})

		if (!response.ok) {
			throw new Error(
				`Failed to update task status. Status: ${response.status}`
			)
		}

		console.log('Task status updated')

		return true
	} catch (error) {
		console.error(`Error updating task status:`, error.message)
		throw error
	}
}
