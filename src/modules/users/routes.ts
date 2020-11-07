import { User } from './entity';
import bcrypt from 'bcrypt'
import { createUserSchema, getUserSchema } from '../users/schema';

export default function usersHandler(server, options, next) {
	server.get(
		'/',
		async (req, res) => {
			req.log.info('list users from db');
			const users = await server.db.users.find();
			res.send(users);
		}
	);

	server.get('/:id',
		{ schema: getUserSchema },
		async (req, res) => {
			req.log.info('list users from db');
			const user = await User.get(req.params.id)
			res.status(200).send(user);
		}
	)

	server.post('/',
		{ schema: createUserSchema },
		async (req, res) => {
			req.log.info('Add user to db');
			const usernameExists = await User.findByUsername(req.body.username)
			const emailExists = await User.findByEmail(req.body.email)

			if(usernameExists)
				throw {name: 'already_exists', message: `User with username ${usernameExists.username} already exists.`} as Error
			else if(emailExists)
				throw {name: 'already_exists', message: `User with email ${emailExists.email} already exists.`} as Error
			else {
				bcrypt.hash(req.body.password, 10, async (err, hash) => {
					const user = await User.create(req.body.username, req.body.email, hash)
					res.status(201).send(user);
				});
			}
		}
	)

	server.put('/:id', async (req, res) => {
		req.log.info('Add user to db');
		const user = await User.get(req.params.id)
		if(user){
			const sameUsername = User.findByUsername(user.username)
			if(!sameUsername)
				res.status(202).send(user.update(req.body))
			else
				throw {name: 'already_exists', message: `User with username ${user.username} already exists.`} as Error
		} else {
			const err: Error = {
				name: 'does_not_exist',
				message: `User with id ${req.params.id} does not exist`,
			} 
			throw err
		}
	});

	next();
};
