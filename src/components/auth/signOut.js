import { auth, signOut } from '../../firebaseConfig.js'
import { hideSignupForm, showSigninForm } from './signUp.js'

// Функція для обробки скролу на мобільних пристроях
const handleScroll = () => {
	const logoutButton = document.getElementById('logout-button')
	const isMobile = window.innerWidth <= 768

	if (isMobile) {
		const scrollTop = window.pageYOffset || document.documentElement.scrollTop
		const scrollThreshold = 100 // Поріг скролу для приховування кнопки

		if (scrollTop > scrollThreshold) {
			logoutButton.style.opacity = '0'
			logoutButton.style.visibility = 'hidden'
		} else {
			logoutButton.style.opacity = '1'
			logoutButton.style.visibility = 'visible'
		}
	}
}

// Додаємо обробник скролу
window.addEventListener('scroll', handleScroll)

// Додаємо обробник зміни розміру вікна для оновлення поведінки
window.addEventListener('resize', handleScroll)

document.getElementById('logout-button').addEventListener('click', async () => {
	try {
		await signOut(auth)
		hideSignupForm()
		showSigninForm()
		document.getElementById('task-container').style.display = 'none'
		console.log('User signed out successfully')
	} catch (error) {
		console.error('Error signing out: ', error.message)
	}
})
