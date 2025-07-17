import { deleteTodo } from '../../API/index.js'
import { updateDeleteCompletedButtonVisibility } from '../../utils/helpers.js'
import { showConfirmation, showError } from '../../utils/notification.js'

export function initDelete(todo, deleteButton) {
	deleteButton.addEventListener('click', async () => {
		const isConfirmed = await showConfirmation(
			'Are you sure you want to permanently delete this task?'
		)
		if (!isConfirmed) {
			return
		}

		try {
			await deleteTodo(todo.id)

			const todoElement = deleteButton.closest('.todo')
			todoElement.remove()

			// Оновлюємо відображення кнопки "Delete all completed tasks"
			updateDeleteCompletedButtonVisibility()
		} catch (error) {
			console.error(error.message)
			showError('Failed to delete task')
		}
	})
}
