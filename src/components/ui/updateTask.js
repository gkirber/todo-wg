import { updateTodo } from '../../API/index.js'
import { showError } from '../../utils/helpers.js'
import { loadData } from './loadData.js'

export async function updateTask(todo) {
	const { value: newText } = await Swal.fire({
		title: 'Edit task',
		input: 'text',
		inputLabel: 'Enter the new task text',
		inputValue: todo.text,
		showCancelButton: true,
		confirmButtonText: 'Save',
		cancelButtonText: 'Cancel',
		inputValidator: value => {
			if (!value) {
				return 'Field cannot be empty!'
			}
		},
	})

	if (newText) {
		try {
			await updateTodo(todo.id, newText)
			await loadData()
		} catch (error) {
			showError('Failed to update task')
		}
	}
}
