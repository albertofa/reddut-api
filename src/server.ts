import fastify from 'fastify';

import db from './plugins/db';
import healthHandler from './modules/health/routes';
import productsHandler from './modules/products/routes';
import usersHandler from './modules/users/routes';
import postsHandler from './modules/posts/routes';
import subreddutsHandler from './modules/subreddut/routes';
import authHandler from './modules/auth/routes';

function createServer() {
	const server = fastify();
	server.register(require('fastify-cors'));

	server.register(require('fastify-oas'), {
		routePrefix: '/docs',
		exposeRoute: true,
		swagger: {
			info: {
				title: 'Reddut API',
				description: 'API Documentation for the reddut services',
				version: '0.1.0'
			},
			servers: [
				{ url: 'http://localhost:3010', description: 'development' },
				{
					url: 'https://<production-url>',
					description: 'production'
				}
			],
			schemes: ['http'],
			consumes: ['application/json'],
			produces: ['application/json'],
		}
	});

	server.register(db);
	server.register(healthHandler, { prefix: '/health' });
	server.register(productsHandler, { prefix: '/product' });
	server.register(usersHandler, { prefix: '/user' });
	server.register(postsHandler, { prefix: '/post' });
	server.register(subreddutsHandler, { prefix: '/subreddut' });
	server.register(authHandler, { prefix: '/auth' });

	server.setErrorHandler((error, req, res) => {
		req.log.error(error.toString());
		res.send({ error });
	});

	return server;
}

export default createServer;
