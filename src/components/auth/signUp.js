import {
	auth,
	createUserWithEmailAndPassword,
	sendEmailVerification,
} from '../../firebaseConfig.js'
import { showSuccess, showWarning } from '../../utils/notification.js'
import { signWithGoogle } from './googleAuth.js'
const signupForm = document.getElementById('signup-form')
const signinForm = document.getElementById('signin-form')
const signInButton = document.getElementById('signIn')

const googleButton = document.getElementById('google-signup-button')
googleButton.addEventListener('click', signWithGoogle)

signInButton.addEventListener('click', event => {
	event.preventDefault()
	hideSignupForm()
	showSigninForm()
})

signupForm.addEventListener('submit', async event => {
	event.preventDefault()

	const email = document.getElementById('signup-email').value

	const password = document.getElementById('signup-password').value

	try {
		const userCredential = await createUserWithEmailAndPassword(
			auth,
			email,
			password
		)

		const user = userCredential.user
		await sendEmailVerification(user)

		showSuccess(
			'To sign in, you need to verify your email. Please check your inbox.'
		)
		signupForm.reset()
		hideSignupForm()
		showSigninForm()
	} catch (error) {
		if (error.code === 'auth/email-already-in-use') {
			showWarning('This email is already registered. Please sign in.')
		}
		console.error('Registration error: ', error.message, error.code)
	}
})

export function hideSignupForm() {
	signupForm.style.display = 'none'
}

export function showSigninForm() {
	signinForm.style.display = 'flex'
}
