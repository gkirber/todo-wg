import { initDragAndDrop } from '../../inits/initDragAndDrop.js'
import { createCheckbox } from './createCheckbox.js'
import { createDeleteButton } from './createDeleteButton.js'
import { createText } from './createText.js'
import { createTime } from './createTime.js'
import { createUpdateButton } from './createUpdateButton.js'

export function createTodoElement(todo, container) {
	const todoElement = document.createElement('div')
	todoElement.classList.add('todo')
	todoElement.setAttribute('data-id', todo.id)

	const checkbox = createCheckbox(todo)
	const updateButton = createUpdateButton(todo)
	const textElement = createText(todo, updateButton)
	const timeElement = createTime(todo)
	const deleteButton = createDeleteButton(todo)

	todoElement.append(checkbox, textElement, timeElement, deleteButton)

	initDragAndDrop(todoElement, todo, container)
	return todoElement
}
