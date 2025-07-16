import { auth, signOut } from '../../firebaseConfig.js'
import { hideSignupForm, showSigninForm } from './signUp.js'

document.getElementById('logout-button').addEventListener('click', async () => {
	try {
		await signOut(auth)
		hideSignupForm()
		showSigninForm()
		document.getElementById('task-container').style.display = 'none'
		console.log('User has signed out')
	} catch (error) {
		console.error('Error during sign out: ', error.message)
	}
})
