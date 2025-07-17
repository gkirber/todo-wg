import {
	auth,
	GoogleAuthProvider,
	signInWithPopup,
} from '../../firebaseConfig.js'

export async function signWithGoogle() {
	const provider = new GoogleAuthProvider()

	try {
		const result = await signInWithPopup(auth, provider)
		console.log(result)
		if (result._tokenResponse.isNewUser) {
			console.log('Google registration completed successfully')
		} else {
			console.log('Google sign-in completed successfully')
		}
	} catch (error) {
		console.error('Google sign-in error: ', error.message)

		// Детальна обробка помилок
		switch (error.code) {
			case 'auth/popup-closed-by-user':
				console.log('User closed the popup')
				break
			case 'auth/popup-blocked':
				console.error('Popup was blocked by browser')
				break
			case 'auth/unauthorized-domain':
				console.error('Domain is not authorized in Firebase Console')
				break
			case 'auth/network-request-failed':
				console.error('Network error occurred')
				break
			default:
				console.error('Unknown error:', error.code, error.message)
		}
	}
}
