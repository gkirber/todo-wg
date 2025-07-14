const overlay = document.getElementById('overlay')

export function showError(message) {
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

export function showLoader() {
	overlay.style.display = 'flex'
}

export function hideLoader() {
	overlay.style.display = 'none'
}
