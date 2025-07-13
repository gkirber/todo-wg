import { addTodo } from './API/addTodoApi.js'
import { deleteTodo } from './API/deleteTodoApi.js'
import { toggleTodoStatus } from './API/getStatusTodoApi.js'
import { getTodos } from './API/getTodoApi.js'
import { updateTodo } from './API/updateTodoApi.js'

const container = document.getElementById('posts-container')
const taskInput = document.getElementById('task-input')
const addButton = document.getElementById('add-button')
const downloadButton = document.querySelector('.button-download')
const overlay = document.getElementById('overlay')

export const host = 'https://677e662d94bde1c1252bc48a.mockapi.io/api/v1/todos'

async function loadData() {
	try {
		showLoader()
		const todos = await getTodos()
		renderData(todos)
	} catch (error) {
		console.error(error.message)
	} finally {
		hideLoader()
	}
}

function renderData(todos) {
	container.innerHTML = ''
	todos.forEach(todo => {
		const todoElement = document.createElement('div')
		todoElement.classList.add('todo')

		const checkbox = document.createElement('input')
		checkbox.type = 'checkbox'
		checkbox.checked = todo.completed

		checkbox.addEventListener('change', async () => {
			try {
				await toggleTodoStatus(todo.id, checkbox.checked)
				await loadData()
			} catch (error) {
				console.error(error.message)
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
			const newText = prompt('Enter new task text:', todo.text)
			if (newText) {
				try {
					await updateTodo(todo.id, newText)
					await loadData()
				} catch (error) {
					console.error(error.message)
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

		container.append(todoElement)
		downloadButton.hidden = true
		hideLoader()
	})
}

async function addNewTodo() {
	const newTodoText = taskInput.value.trim()

	if (!newTodoText) {
		alert('Please enter task text!')
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
		console.error(`Error adding task:`, error.message)
	}
}

addButton.addEventListener('click', addNewTodo)

taskInput.addEventListener('keydown', event => {
	if (event.key === 'Enter') {
		addNewTodo()
	}
})

downloadButton.addEventListener('click', loadData)

function showLoader() {
	overlay.style.display = 'flex'
}

function hideLoader() {
	overlay.style.display = 'none'
}
