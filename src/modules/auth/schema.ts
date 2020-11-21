export const loginSchema = {
	body: {
		type: 'object',
		required: ['password'],
		properties: {
			username: { type: 'string' },
			email: { type: 'string' },
			password: { type: 'string' }
		}
	},
	response: { 
		200: {
			type: 'object',
			properties: {
				id: { type: 'string' },
				username: { type: 'string' },
				email: { type: 'string' },
				token: { type: 'string' }
			}
		}
	}
}