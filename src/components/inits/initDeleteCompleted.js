import { deleteCompletedTodos } from '../../API/index.js'
import { showConfirmation, showError } from '../../utils/notification.js'
import { container, deleteCompletedButton } from '../index.js'

export function initDeleteCompleted() {
	deleteCompletedButton.addEventListener('click', async () => {
		const isConfirmed = await showConfirmation(
			'All completed tasks will be deleted! Are you sure?'
		)

		if (!isConfirmed) {
			return
		}

		try {
			await deleteCompletedTodos(container)
			// Видаляємо виклик loadData(), оскільки DOM вже оновлений локально
			// await loadData();
		} catch (error) {
			console.error(error.message)
			showError('Failed to delete the task list')
		}
	})
}
