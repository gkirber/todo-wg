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
			console.log('Registration via Google was successful')
		} else {
			console.log('Login via Google was successful')
		}
	} catch (error) {
		console.error('Error logging in via Google: ', error.message)
	}
}
