import { host } from '../host.js'

export async function deleteCompletedTodos(container) {
	try {
		const completedTodos = Array.from(
			container.querySelectorAll('.todo')
		).filter(todoElement => {
			const checkbox = todoElement.querySelector('input[type="checkbox"]')
			return checkbox.checked
		})

		for (const todoElement of completedTodos) {
			const taskId = todoElement.getAttribute('data-id')

			const deleteResponse = await fetch(`${host}/${taskId}.json`, {
				method: 'DELETE',
			})

			if (!deleteResponse.ok) {
				throw new Error(
					`Failed to delete completed tasks. Status: ${deleteResponse.status}`
				)
			}
		}

		return true
	} catch (error) {
		console.error('Error deleting completed tasks:', error.message)
		throw error
	}
}
