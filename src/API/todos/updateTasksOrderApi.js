import { host } from '../host.js'

export async function updateTaskOrderOnServer(taskId, order) {
	try {
		const response = await fetch(`${host}/${taskId}.json`, {
			method: 'PATCH',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({ order }),
		})

		if (!response.ok) {
			throw new Error(`Failed to update task order. Status: ${response.status}`)
		}
	} catch (error) {
		console.error(`Error updating task order:`, error.message)
		throw error
	}
}
