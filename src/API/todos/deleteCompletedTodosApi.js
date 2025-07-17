import { getUserInfo } from '../../utils/authHelper.js'
import { updateDeleteCompletedButtonVisibility } from '../../utils/helpers.js'
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

		// Оновлюємо відображення кнопки "Delete all completed tasks"
		updateDeleteCompletedButtonVisibility()

		return true
	} catch (error) {
		throw error
	}
}
