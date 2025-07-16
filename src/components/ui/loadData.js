import { getTodos } from '../../API/index.js'
import { renderData } from '../index.js'
import { showError, showLoader, hideLoader } from '../../utils/helpers.js'
import { getUserInfo } from '../../utils/authHelper.js'

export async function loadData() {
	try {
		showLoader()

		const { uid, token } = await getUserInfo()
		const todos = await getTodos(uid, token)

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
