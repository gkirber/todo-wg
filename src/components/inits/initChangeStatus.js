import { toggleTodoStatus } from '../../API/index.js'
import { showError } from '../../utils/notification.js'
import { loadData } from '../index.js'

export function initChangeStatus(todo, checkbox) {
	checkbox.addEventListener('change', async () => {
		try {
			await toggleTodoStatus(todo.id, checkbox.checked)
			await loadData()
		} catch (error) {
			console.error(error.message)
			showError('Failed to change task status')
		}
	})
}
