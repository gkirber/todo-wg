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
	}
}
