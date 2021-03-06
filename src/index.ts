import createServer from './server';
import dotenv from 'dotenv';
dotenv.config();

const PORT = process.env.PORT || '3010';
const server = createServer();

server.listen(+PORT, '0.0.0.0', (err, address) => {
	if (err) throw err;
	console.log(`server listening on ${address}`);
});

module.exports = server;
