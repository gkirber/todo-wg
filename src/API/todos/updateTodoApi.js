import { getUserInfo } from '../../utils/authHelper.js'
import { host } from '../host.js'

export async function updateTodo(id, newText) {
	try {
		const { uid, token } = await getUserInfo()

		const response = await fetch(`${host}/${uid}/${id}.json?auth=${token}`, {
			method: 'PATCH',
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
		throw error
	}
}
