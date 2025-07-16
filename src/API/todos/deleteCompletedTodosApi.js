import { getUserInfo } from '../../utils/authHelper.js'
import { host } from '../host.js'

export async function deleteCompletedTodos(container) {
	try {
		const { uid, token } = await getUserInfo()

		const completedTodos = Array.from(
			container.querySelectorAll('.todo')
		).filter(todoElement => {
			const checkbox = todoElement.querySelector('input[type="checkbox"]')
			return checkbox.checked
		})

		for (const todoElement of completedTodos) {
			const taskId = todoElement.getAttribute('data-id')

			const deleteResponse = await fetch(
				`${host}/${uid}/${taskId}.json?auth=${token}`,
				{
					method: 'DELETE',
				}
			)

			if (!deleteResponse.ok) {
				throw new Error(
					`Failed to delete completed list. Status: ${deleteResponse.status}`
				)
			}
			todoElement.remove()
		}
		//Remove loadData, as there's no need to query the database every time, just remove the todoElement from the DOM tree
		// await loadData();
		return true
	} catch (error) {
		console.error('Error deleting completed tasks:', error.message)
		throw error
	}
}
