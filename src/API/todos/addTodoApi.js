import { getUserInfo } from '../../utils/authHelper.js'
import { host } from '../host.js'

export async function addTodo(newTodo) {
	try {
		const { uid, token } = await getUserInfo()

		const response = await fetch(`${host}/${uid}.json?auth=${token}`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(newTodo),
		})

		if (!response.ok) {
			throw new Error(`Failed to add the task. Status: ${response.status}`)
		}

		console.log('Task added')
		return await response.json()
	} catch (error) {
		console.error(`Error adding:`, error.message)
		throw error
	}
}
