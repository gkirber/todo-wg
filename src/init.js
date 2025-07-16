import {
	hideSigninForm,
	hideSignupForm,
	initAddTodo,
	initDeleteCompleted,
	loadData,
	showTasksBlock,
} from './components/index.js'
import { auth, onAuthStateChanged } from './firebaseConfig.js'
import { showWarning } from './utils/notification.js'

export function initApp() {
	onAuthStateChanged(auth, user => {
		if (user) {
			if (!user.emailVerified) {
				showWarning('Your email is not verified. Please check your inbox.')
				return
			}
			loadData()
			hideSigninForm()
			hideSignupForm()
			showTasksBlock()
		} else {
			console.log('User is not authorized')
			document.getElementById('signup-form').style.display = 'flex'
		}
	})

	initAddTodo()
	initDeleteCompleted()
}
