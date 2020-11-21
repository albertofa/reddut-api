import { FastifyContext, FastifyInstance, FastifyLoggerInstance } from "fastify";
import { Server, IncomingMessage, ServerResponse } from "http";
import { verifyToken } from "../../plugins/auth";
import { Subreddut } from "../subreddut/entity";
import { User } from "../users/entity";
import { Post } from "./entity";
import { listSchema } from "./schema";

export default function postsHandler(server: FastifyInstance<Server> & PromiseLike<FastifyInstance<Server>>, options, next) {
	server.get(
		'/',
		async (req: any, res) => {
			const users = await Post.list(req.body.title, req.body.user_id, req.body.subreddut_id);
			res.status(200).send(users);
		}
	);

	server.get(
		'/:id',
		async (req:any, res) => {
			req.log.info('list users from db');
			const user = await Post.get(req.params.id)
			res.status(200).send(user);
		}
	);

	server.post('/', async (req, res) => {
		if(!req.headers.authorization)
			throw {name: 'invalid_token', message: `Pass a valid token in header 'Authorization'.`} as Error
		verifyToken(req.headers.authorization)
		
		req.log.info('Add user to db');
		const bodyRequest: any = req.body

		const user = await User.get(bodyRequest.user_id)
		if(!user)
			throw new Error(`User with id ${bodyRequest.user_id} does not exist`)

		const sub = await Subreddut.get(bodyRequest.subreddut_id)
		if(!sub)
			throw new Error(`Subreddut with id ${bodyRequest.subreddut_id} does not exist`)

		const post = await Post.create(bodyRequest.title, bodyRequest.content, user, sub);
		res.status(201).send(post);
	});

	next();
};
