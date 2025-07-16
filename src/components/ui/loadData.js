import { getTodos } from '../../API/index.js'
import { getUserInfo } from '../../utils/authHelper.js'
import { hideLoader, showLoader } from '../../utils/helpers.js'
import { showError, showInfo } from '../../utils/notification.js'
import { renderData } from '../index.js'

export async function loadData() {
	try {
		showLoader()

		const { uid, token } = await getUserInfo()
		const todos = await getTodos(uid, token)

		if (todos.length === 0) {
			showInfo('You have no tasks yet')
		} else {
			renderData(todos)
		}
	} catch (error) {
		console.error(error.message)
		showError('Failed to fetch data')
	} finally {
		hideLoader()
	}
}
