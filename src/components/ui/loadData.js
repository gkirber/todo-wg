import { getTodos } from '../../API/index.js'
import { hideLoader, showError, showLoader } from '../../utils/helpers.js'
import { renderData } from '../index.js'

export async function loadData() {
	try {
		showLoader()
		const todos = await getTodos()

		renderData(todos)
	} catch (error) {
		console.error(error.message)
		if (error.message === 'No tasks') {
			showError('No tasks')
		} else {
			showError('Failed to fetch data')
		}
	} finally {
		hideLoader()
	}
}
