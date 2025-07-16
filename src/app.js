import { initAddTodo, initDeleteCompleted } from './components/index.js'
import { auth, onAuthStateChanged } from './firebaseConfig.js'

// Ініціалізація авторизації
onAuthStateChanged(auth, user => {
	if (user) {
		// Користувач авторизований
		document.getElementById('signup-form').style.display = 'none'
		document.getElementById('signin-form').style.display = 'none'
		document.getElementById('task-container').style.display = 'block'
		// Завантажуємо дані
		import('./components/ui/loadData.js').then(({ loadData }) => loadData())
	} else {
		// Користувач не авторизований
		document.getElementById('signup-form').style.display = 'block'
		document.getElementById('signin-form').style.display = 'none'
		document.getElementById('task-container').style.display = 'none'
	}
})

initAddTodo()
initDeleteCompleted()
