import { deleteCompletedTodos } from '../../API/index.js'
import { showError } from '../../utils/helpers.js'
import { container, deleteCompletedButton, loadData } from '../index.js'

export function initDeleteCompleted() {
	deleteCompletedButton.addEventListener('click', async () => {
		const { isConfirmed } = await Swal.fire({
			title: 'Are you sure?',
			text: 'All completed tasks will be deleted!',
			icon: 'warning',
			showCancelButton: true,
			confirmButtonColor: '#3085d6',
			cancelButtonColor: '#d33',
			confirmButtonText: 'Yes, delete!',
			cancelButtonText: 'Cancel',
		})

		console.log(isConfirmed)

		if (!isConfirmed) {
			return
		}

		try {
			await deleteCompletedTodos(container)
			await loadData()
		} catch (error) {
			console.error(error.message)
			showError('Failed to delete the task list')
		}
	})
}
