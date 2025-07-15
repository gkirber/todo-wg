import { host } from '../host.js'

export async function getTodos() {
	try {
		const response = await fetch(`${host}.json`, {
			method: 'GET',
		})

		if (!response.ok) {
			throw new Error(`Data not received. Status: ${response.status}`)
		}

		const data = await response.json()
		console.log('Data received:', data)

		if (!data) {
			throw new Error('No tasks')
		}

		const todosArray = Object.keys(data).map(key => ({
			id: key,
			...data[key],
		}))

		todosArray.sort((a, b) => a.order - b.order)

		console.log(todosArray)
		return todosArray
	} catch (error) {
		console.error(`Error receiving data:`, error.message)
		throw error
	}
}
