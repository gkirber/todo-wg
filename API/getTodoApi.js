import { host } from '../script.js'

export async function getTodos() {
	try {
		const response = await fetch(host, {
			method: 'GET',
		})

		if (!response.ok) {
			throw new Error(`Data not received. Status: ${response.status}`)
		}

		const data = await response.json()
		console.log('Data received:', data)
		return data
	} catch (error) {
		console.error(`Error receiving data:`, error.message)
		throw error
	}
}
