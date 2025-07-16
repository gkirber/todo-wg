import { auth, onAuthStateChanged } from '../firebaseConfig.js'

/**
 * Gets information about the current authorized user
 * @returns {Promise<{uid: string, token: string}} Object with user uid and token
 * @throws {Error} If user is not authorized
 */

export const getUserInfo = () => {
	return new Promise((resolve, reject) => {
		onAuthStateChanged(auth, async user => {
			if (user) {
				try {
					const token = await user.getIdToken()
					resolve({ uid: user.uid, token })
				} catch (error) {
					reject(new Error('Failed to get token'))
				}
			} else {
				reject(new Error('User is not authorized'))
			}
		})
	})
}
