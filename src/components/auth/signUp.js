import {
	auth,
	createUserWithEmailAndPassword,
	sendEmailVerification,
	signInWithEmailAndPassword,
} from '../../firebaseConfig.js'
import { showSuccess, showWarning } from '../../utils/notification.js'
import { loadData } from '../index.js'
import { signWithGoogle } from './googleAuth.js'
import { hideSigninForm, showTasksBlock } from './signIn.js'

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

// Функція для автоматичного входу користувача
const handleAutoSignIn = async (email, password) => {
	console.log('Attempting auto sign-in for:', email)
	try {
		const userCredential = await signInWithEmailAndPassword(
			auth,
			email,
			password
		)
		const user = userCredential.user
		console.log('Auto sign-in successful for user:', user.email)

		if (!user.emailVerified) {
			console.log('Email not verified, showing warning')
			showWarning('Your email is not verified. Please check your email')
			return
		}

		console.log('Email verified, proceeding to app')
		showSuccess('Welcome back! You have been automatically signed in.')
		hideSignupForm()
		hideSigninForm()
		showTasksBlock()
		loadData()
	} catch (error) {
		console.log('Auto sign-in failed:', error.code, error.message)
		showWarning('Auto sign-in failed. Please try signing in manually.')
		hideSignupForm()
		showSigninForm()
		// Переносимо дані в форму входу
		document.getElementById('signin-email').value = email
		document.getElementById('signin-password').value = password
	}
}

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
			'Email verification required for login. Please check your email'
		)
		signupForm.reset()
		hideSignupForm()
		showSigninForm()
	} catch (error) {
		console.log('Registration error:', error.code, error.message)
		switch (error.code) {
			case 'auth/email-already-exists':
			case 'auth/email-already-in-use':
				console.log('Email already exists, attempting auto sign-in')
				// Замість показу попередження, спробуємо автоматично увійти
				await handleAutoSignIn(email, password)
				break
			case 'auth/invalid-email':
				showWarning('Invalid email format. Please check your input')
				break
			case 'auth/weak-password':
				showWarning('Password must be at least 6 characters long')
				break
			default:
				showWarning('An unknown error occurred: ', error.message, error.code)
				break
		}
	}
})

export function hideSignupForm() {
	signupForm.style.display = 'none'
}

export function showSigninForm() {
	signinForm.style.display = 'flex'
}
