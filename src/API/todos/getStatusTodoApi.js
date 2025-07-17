import { getUserInfo } from '../../utils/authHelper.js'
import { host } from '../host.js'

export async function toggleTodoStatus(id, completed) {
	try {
		const { uid, token } = await getUserInfo()

		const response = await fetch(`${host}/${uid}/${id}.json?auth=${token}`, {
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
		throw error
	}
}
