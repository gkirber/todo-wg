const overlay = document.getElementById('overlay')

export function showLoader() {
	overlay.style.display = 'flex'
}

export function hideLoader() {
	overlay.style.display = 'none'
}

export function updateDeleteCompletedButtonVisibility() {
	const container = document.getElementById('posts-container')
	const completedTodos = Array.from(container.querySelectorAll('.todo')).filter(
		todoElement => {
			const checkbox = todoElement.querySelector('input[type="checkbox"]')
			return checkbox.checked
		}
	)

	const deleteCompletedButton = document.getElementById(
		'delete-completed-button'
	)
	if (deleteCompletedButton) {
		deleteCompletedButton.style.display =
			completedTodos.length > 0 ? 'block' : 'none'
	}
}
