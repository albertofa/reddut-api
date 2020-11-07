import { User } from "../users/entity";
import { Subreddut } from "./entity";

export default function subreddutsHandler(server, options, next) {
	server.get(
		'/',
		async (req, res) => {
			const users = await server.db.posts.find();
			res.send(users);
		}
	);

	/*server.get(
		'/:id',
		async (req, res) => {
			req.log.info('list users from db');
			const user = await User.get(req.params.id)
			res.send(user);
		}
	);*/

	server.post('/', async (req, res) => {
		req.log.info('Add user to db');
		const subreddut = Subreddut.create(req.body.name);
		res.status(201).send(subreddut);
	});

	/*server.put('/:id', async (req, res) => {
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
	});*/

	next();
};
