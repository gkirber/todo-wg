import {
	auth,
	sendEmailVerification,
	signInWithEmailAndPassword,
} from '../../firebaseConfig.js'
import { showConfirmation, showWarning } from '../../utils/notification.js'
import { loadData } from '../index.js'
import { signWithGoogle } from './googleAuth.js'

const googleButton = document.getElementById('google-signin-button')
googleButton.addEventListener('click', signWithGoogle)

const forgotPasswordForm = document.getElementById('forgot-password-form')
const forgotPasswordButton = document.getElementById('forgot-password-button')
forgotPasswordButton.addEventListener('click', showForgotPasswordForm)

const signinForm = document.getElementById('signin-form')

const taskContainer = document.getElementById('task-container')

signinForm.addEventListener('submit', async event => {
	event.preventDefault()

	const email = document.getElementById('signin-email').value

	const password = document.getElementById('signin-password').value

	try {
		const userCredential = await signInWithEmailAndPassword(
			auth,
			email,
			password
		)

		const user = userCredential.user

		if (!user.emailVerified) {
			showWarning('Your email is not verified. Please check your email')
			const resend = await showConfirmation('Send verification email again?')

			if (resend) {
				await sendEmailVerification(user)
				showSuccess('Verification email sent again. Please check your email')
			}
			return
		}
		hideSigninForm()
		showTasksBlock()
		loadData()
	} catch (error) {
		switch (error.code) {
			case 'auth/too-many-requests':
				showWarning('Too many login attempts. Please try again later')
				break
			case 'auth/invalid-credential':
				showWarning('Invalid credentials. Please check your email and password')
				break

			default:
				showWarning('Authentication error:', error.message, error.code)
				break
		}
	}
})

export function showTasksBlock() {
	taskContainer.style.display = 'block'
}

export function hideSigninForm() {
	signinForm.style.display = 'none'
}

function showForgotPasswordForm() {
	forgotPasswordForm.style.display = 'flex'
	hideSigninForm()
}
