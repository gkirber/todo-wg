import {
	hideLoader,
	updateDeleteCompletedButtonVisibility,
} from '../../utils/helpers.js'
import { createTodoElement } from './createElements/createTodoElements.js'

export const container = document.getElementById('posts-container')
export const deleteCompletedButton = document.getElementById(
	'delete-completed-button'
)
export function renderData(todos) {
	container.innerHTML = ''

	todos.forEach(todo => {
		const todoElement = createTodoElement(todo, container)
		container.append(todoElement)
	})

	// Оновлюємо відображення кнопки "Delete all completed tasks"
	updateDeleteCompletedButtonVisibility()

	hideLoader()
}
