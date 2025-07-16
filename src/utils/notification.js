export const showNotification = (message, type, customTitle) => {
	const titles = {
		error: 'Error!',
		success: 'Success!',
		warning: 'Warning!',
		info: 'Info',
	}

	const title = customTitle || titles[type] || 'Notification'

	Swal.fire({
		title,
		text: message,
		icon: type,
		showConfirmButton: true,
		confirmButtonText: 'OK',
	})
}

export const showError = message => {
	showNotification(message, 'error', 'Error!')
}

export const showSuccess = message => {
	showNotification(message, 'success')
}

export const showWarning = message => {
	showNotification(message, 'warning')
}

export const showInfo = message => {
	showNotification(message, 'info')
}

export const showConfirmation = async (
	message,
	customTitle = 'Confirm action'
) => {
	const result = await Swal.fire({
		icon: 'question',
		title: customTitle,
		text: message,
		showCancelButton: true,
		confirmButtonColor: '#3085d6',
		cancelButtonColor: '#d33',
		confirmButtonText: 'Yes',
		cancelButtonText: 'No',
	})
	return result.isConfirmed
}
