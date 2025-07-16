import { addTodo } from '../../API/index.js'
import { showError } from '../../utils/notification.js'
import { loadData } from './loadData.js'

export async function addNewTodo(taskInput) {
	const newTodoText = taskInput.value.trim()

	if (!newTodoText) {
		alert('Enter the task text!')
		return
	}

	const newTodo = {
		text: newTodoText,
		createdAt: Date.now(),
		completed: false,
	}

	try {
		await addTodo(newTodo)
		console.log('Task added')
		taskInput.value = ''
		await loadData()
	} catch (error) {
		console.error(error.message)
		showError('Failed to add task')
	}
}
