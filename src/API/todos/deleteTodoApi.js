import { host } from '../host.js'

export async function deleteTodo(id) {
	try {
		const response = await fetch(`${host}/${id}.json`, {
			method: 'DELETE',
		})
		if (!response.ok) {
			throw new Error(`Failed to delete task. Status: ${response.status}`)
		}

		console.log('Task deleted')

		return true
	} catch (error) {
		console.error(`Error deleting task:`, error.message)
		throw error
	}
}
