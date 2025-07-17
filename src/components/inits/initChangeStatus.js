import { toggleTodoStatus } from '../../API/index.js'
import { updateDeleteCompletedButtonVisibility } from '../../utils/helpers.js'
import { showError } from '../../utils/notification.js'

export function initChangeStatus(todo, checkbox) {
	checkbox.addEventListener('change', async () => {
		try {
			await toggleTodoStatus(todo.id, checkbox.checked)

			// Оновлюємо відображення кнопки "Delete all completed tasks"
			updateDeleteCompletedButtonVisibility()
		} catch (error) {
			console.error(error.message)
			showError('Failed to change task status')
		}
	})
}
