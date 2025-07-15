import { deleteTodo } from '../../API/index.js'
import { showError } from '../../utils/helpers.js'
import { loadData } from '../ui/loadData.js'

export function initDelete(todo, deleteButton) {
	deleteButton.addEventListener('click', async () => {
		try {
			await deleteTodo(todo.id)
			await loadData()
		} catch (error) {
			console.error(error.message)
			showError('Failed to delete task')
		}
	})
}
