import 'reflect-metadata';
import fp from 'fastify-plugin';
import { ConnectionOptions, createConnection, getConnectionOptions } from 'typeorm';
import { Product } from '../modules/products/entity';
import { User } from '../modules/users/entity';
import { Post } from '../modules/posts/entity';
import { Subreddut } from '../modules/subreddut/entity';
import { MysqlConnectionOptions } from 'typeorm/driver/mysql/MysqlConnectionOptions';
import { URL } from 'url';

export default fp(async server => {
	try {
		let connectionOptions: MysqlConnectionOptions | ConnectionOptions
		if(process.env.NODE_ENV == 'production'){
			const connectionString = new URL(process.env.CLEARDB_DATABASE_URL)
			connectionOptions = {
				type: "mysql",
				host: connectionString.host,
				port: 3306,
				username: connectionString.username,
				password: connectionString.password,
				database: connectionString.pathname.split('/')[1],
				synchronize: false,
				logging: true,
				entities: ["src/entity/*.*"]
			}
		} else {
			connectionOptions = await getConnectionOptions();
		}

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
