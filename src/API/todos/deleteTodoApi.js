import { getUserInfo } from '../../utils/authHelper.js'
import { host } from '../host.js'

export async function deleteTodo(id) {
	try {
		const { uid, token } = await getUserInfo()

		const response = await fetch(`${host}/${uid}/${id}.json?auth=${token}`, {
			method: 'DELETE',
		})
		if (!response.ok) {
			throw new Error(`Failed to delete the task. Status: ${response.status}`)
		}

		console.log('Task deleted')

		return true
	} catch (error) {
		console.error(`Error deleting:`, error.message)
		throw error
	}
}
