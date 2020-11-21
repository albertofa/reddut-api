import 'reflect-metadata';
import fp from 'fastify-plugin';
import { createConnection, getConnectionOptions } from 'typeorm';
import { Product } from '../modules/products/entity';
import { User } from '../modules/users/entity';
import { Post } from '../modules/posts/entity';
import { Subreddut } from '../modules/subreddut/entity';
import { MysqlConnectionOptions } from 'typeorm/driver/mysql/MysqlConnectionOptions';

export default fp(async server => {
	try {
		let connectionOptions = await getConnectionOptions();
		/*const conn: MysqlConnectionOptions = {

		}*/
		Object.assign(connectionOptions, {
			options: { encrypt: true },
			entities: [Product, User, Post, Subreddut]
		});

		const connection = await createConnection(connectionOptions);
		console.log('database connected');

		server.decorate('db', {
			products: connection.getRepository(Product),
			users: connection.getRepository(User),
			posts: connection.getRepository(Post)
		});
	} catch (error) {
		console.log(error);
		console.log('make sure you have set .env variables - see .env.sample');
	}
});
