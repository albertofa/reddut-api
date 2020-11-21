import { getHealthSchema } from './schema';

export default function healthHandler(server, options, next) {
	server.get('/', { schema: getHealthSchema }, (req, res) => {
		res.send({ status: 'ok' });
	});

	server.get('/info', { schema: getHealthSchema }, (req, res) => {
		const env_info = {
			db: process.env.CLEARDB_DATABASE_URL,
			secret: process.env.JWT_SECRET
		}
		res.send(env_info);
	});

	next();
}
