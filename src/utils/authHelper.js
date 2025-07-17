import { auth, onAuthStateChanged } from '../firebaseConfig.js'

/**
 * Gets information about the currently authorized user
 * @returns {Promise<{uid: string, token: string}} Object with user's uid and token
 * @throws {Error} If the user is not authorized
 */

export const getUserInfo = () => {
	return new Promise((resolve, reject) => {
		onAuthStateChanged(auth, async user => {
			if (user) {
				try {
					const token = await user.getIdToken()
					resolve({ uid: user.uid, token, emailVerified: user.emailVerified })
				} catch (error) {
					reject(new Error('Failed to get token'))
				}
			} else {
				reject(new Error('User is not authorized'))
			}
		})
	})
}
