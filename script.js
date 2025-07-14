import { addTodo } from './API/addTodoApi.js'
import { deleteCompletedTodos } from './API/deleteCompletedTodosApi.js'
import { deleteTodo } from './API/deleteTodoApi.js'
import { toggleTodoStatus } from './API/getStatusTodoApi.js'
import { getTodos } from './API/getTodoApi.js'
import { updateTaskOrderOnServer } from './API/updateTasksOrderApi.js'
import { updateTodo } from './API/updateTodoApi.js'

const container = document.getElementById('posts-container')
const taskInput = document.getElementById('task-input')
const addButton = document.getElementById('add-button')
const downloadButton = document.querySelector('.button-download')
const overlay = document.getElementById('overlay')
const deleteCompletedButton = document.getElementById('delete-completed-button')

export const host = 'https://68740dc7dd06792b9c93102f.mockapi.io/api/v1/todos'

async function loadData() {
	try {
		showLoader()
		const todos = await getTodos()

		renderData(todos)
	} catch (error) {
		console.error(error.message)
		if (error.message === 'No tasks') {
			showError('No tasks')
		} else {
			showError('Failed to get data')
		}
	} finally {
		hideLoader()
	}
}

function renderData(todos) {
	container.innerHTML = ''

	const hasCompletedTodos = todos.some(todo => todo.completed)

	deleteCompletedButton.style.display = hasCompletedTodos ? 'block' : 'none'

	todos.forEach(todo => {
		const todoElement = document.createElement('div')
		todoElement.classList.add('todo')
		todoElement.setAttribute('data-id', todo.id)

		const checkbox = document.createElement('input')
		checkbox.type = 'checkbox'
		checkbox.checked = todo.completed

		checkbox.addEventListener('change', async () => {
			try {
				await toggleTodoStatus(todo.id, checkbox.checked)
				await loadData()
			} catch (error) {
				console.error(error.message)
				showError('Failed to change task status')
			}
		})

		const textElement = document.createElement('p')
		textElement.textContent = todo.text
		textElement.style.textDecoration = todo.completed ? 'line-through' : 'none'

		const timeElement = document.createElement('p')
		timeElement.textContent = new Date(todo.createdAt).toLocaleString('en-US', {
			year: 'numeric',
			month: 'numeric',
			day: 'numeric',
			hour: '2-digit',
			minute: '2-digit',
		})

		const deleteButton = document.createElement('button')
		deleteButton.classList.add('button-function')

		const deleteIcon = document.createElement('img')
		deleteIcon.src = 'images/icon-delete.png'
		deleteIcon.alt = 'Delete'
		deleteIcon.title = 'Delete'

		deleteButton.append(deleteIcon)

		deleteButton.addEventListener('click', async () => {
			try {
				await deleteTodo(todo.id)
				await loadData()
			} catch (error) {
				console.error(error.message)
				showError('Failed to delete task')
			}
		})

		const updateButton = document.createElement('button')
		updateButton.classList.add('button-function')

		const updateIcon = document.createElement('img')
		updateIcon.src = 'images/icon-update.png'
		updateIcon.alt = 'Edit'
		updateIcon.title = 'Edit'

		updateButton.append(updateIcon)

		updateButton.addEventListener('click', async () => {
			const { value: newText } = await Swal.fire({
				title: 'Edit task',
				input: 'text',
				inputLabel: 'Enter new task text',
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
		})

		todoElement.append(
			checkbox,
			textElement,
			timeElement,
			deleteButton,
			updateButton
		)

		addDragAndDropListeners(todoElement, todo)
		container.append(todoElement)
		downloadButton.hidden = true
		hideLoader()
	})
}

async function addNewTodo() {
	const newTodoText = taskInput.value.trim()

	if (!newTodoText) {
		alert('Enter task text!')
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

addButton.addEventListener('click', addNewTodo)

taskInput.addEventListener('keydown', event => {
	if (event.key === 'Enter') {
		addNewTodo()
	}
})

downloadButton.addEventListener('click', loadData)

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
		showError('Failed to delete task list')
	}
})

function showLoader() {
	overlay.style.display = 'flex'
}

function hideLoader() {
	overlay.style.display = 'none'
}

function addDragAndDropListeners(todoElement, todo) {
	todoElement.draggable = true
	todoElement.addEventListener('dragstart', event => {
		event.dataTransfer.setData('text/plain', todo.id)
		event.currentTarget.classList.add('dragging')
	})

	todoElement.addEventListener('dragover', event => {
		event.preventDefault()
		const draggable = document.querySelector('.dragging')
		const overElement = event.currentTarget

		if (overElement !== draggable) {
			const rect = overElement.getBoundingClientRect()
			const offset = event.clientY - rect.top
			if (offset < rect.height / 2) {
				container.insertBefore(draggable, overElement)
			} else {
				container.insertBefore(draggable, overElement.nextSibling)
			}
		}
	})

	todoElement.addEventListener('dragend', event => {
		event.currentTarget.classList.remove('dragging')

		updateTaskOrder()
	})
}

async function updateTaskOrder() {
	const todos = [...container.querySelectorAll('.todo')]
	const updatedOrder = todos.map((todo, index) => {
		return {
			id: todo.getAttribute('data-id'),
			order: index + 1,
		}
	})

	try {
		showLoader()
		for (const task of updatedOrder) {
			await updateTaskOrderOnServer(task.id, task.order)
		}

		console.log('Task order updated')

		return true
	} catch (error) {
		console.error(error.message)
		showError('Failed to move element')
	} finally {
		hideLoader()
	}
}

function showError(message) {
	const icon = message === 'No tasks' ? 'info' : 'error'
	const title = message === 'No tasks' ? 'Information' : 'Error'
	const text = message === 'No tasks' ? 'You have no tasks' : message

	Swal.fire({
		title,
		text,
		icon,
		showConfirmButton: true,
	})
}
