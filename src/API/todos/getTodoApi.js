import { host } from '../host.js'

export async function getTodos() {
	try {
		const response = await fetch(host, {
			method: 'GET',
		})

		if (!response.ok) {
			throw new Error(`Data not received. Status: ${response.status}`)
		}

		const data = await response.json()

		if (data.length === 0) {
			throw new Error('No tasks')
		}
		data.sort((a, b) => a.order - b.order)
		console.log('Data received:', data)
		return data
	} catch (error) {
		console.error(`Error fetching data:`, error.message)
		throw error
	}
}
