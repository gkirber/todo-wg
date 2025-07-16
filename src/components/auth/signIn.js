import { auth, signInWithEmailAndPassword } from '../../firebaseConfig.js'
import { loadData } from '../index.js'
const signinForm = document.getElementById('signin-form')
const signupForm = document.getElementById('signup-form')
const signUpButton = document.getElementById('signUp')
const taskContainer = document.getElementById('task-container')

signUpButton.addEventListener('click', event => {
	event.preventDefault()
	hideSigninForm()
	showSignupForm()
})

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
		console.log('User authorized', user.uid)

		alert('Authorization successful')
		hideSigninForm()
		showTasksBlock()
		loadData()
	} catch (error) {
		console.error('Authorization error: ', error.message, error.code)
		alert(`Authorization error: ${error.message}`)
	}
})

function showTasksBlock() {
	taskContainer.style.display = 'block'
}

function hideSigninForm() {
	signinForm.style.display = 'none'
}

function showSignupForm() {
	signupForm.style.display = 'block'
}
