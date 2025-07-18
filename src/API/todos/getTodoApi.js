import { host } from '../host.js'

export async function getTodos(uid, token) {
	try {
		const response = await fetch(`${host}/${uid}.json?auth=${token}`, {
			method: 'GET',
		})

		if (!response.ok) {
			throw new Error(`Data not received. Status: ${response.status}`)
		}

		const data = await response.json()
		console.log('Data received:', data)

		if (!data) {
			return []
		}

		const todosArray = Object.keys(data).map(key => ({
			id: key,
			...data[key],
		}))

		todosArray.sort((a, b) => a.order - b.order)

		console.log(todosArray)
		return todosArray
	} catch (error) {
		throw error
	}
}
