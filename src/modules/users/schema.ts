export const userSchema = {
	id: { type: 'string', format: 'uuid' },
	username: { type: 'string' },
	email: { type: 'string' }
};

export const userResponse = {
	200: {
		type: 'object',
		properties: userSchema
	},
	201: {
		type: 'object',
		properties: userSchema
	}
}

export const listUsersSchema = {
	summary: 'users',
	description: 'users',
	response: {
		200: {
			type: 'array',
			items: {
				properties: userSchema
			}
		}
	}
};

export const createUserSchema = {
	body: {
		type: 'object',
		required: ['username', 'email', 'password'],
		properties: {
			username: { type: 'string' },
			email: { type: 'string' },
			password: { type: 'string' }
		}
	},
	response: userResponse 
}

export const getUserSchema = {
	response: userResponse, 
	querystring: {
		required: true,
		id: { type: 'string' }
	} 
}


