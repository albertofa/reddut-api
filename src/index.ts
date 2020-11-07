import createServer from './server';

const PORT = process.env.PORT || '3010';
const server = createServer();

server.listen(+PORT, 'localhost', (err, address) => {
	if (err) throw err;
	console.log(`server listening on ${address}`);
});

module.exports = server;
