import {
	auth,
	sendEmailVerification,
	signInWithEmailAndPassword,
} from '../../firebaseConfig.js'
import {
	showConfirmation,
	showSuccess,
	showWarning,
} from '../../utils/notification.js'
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
			showWarning('Your email is not verified. Please check your inbox.')
			const resend = await showConfirmation('Resend verification email?')

			if (resend) {
				await sendEmailVerification(user)
				showSuccess('Verification email resent. Please check your inbox.')
			}
			return
		}
		hideSigninForm()
		showTasksBlock()
		loadData()
	} catch (error) {
		if (error.code === 'auth/email-already-in-use') {
			showWarning('This email is already registered. Please sign in.')
		}
		console.error('Registration error: ', error.message, error.code)
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
