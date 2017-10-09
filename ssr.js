const express = require('express');
const server = express();
const {resolve} = require('path');

const PORT = process.env.PORT || 3000;
const HOST = process.env.HOST || '127.0.0.1';

server.use('/assets', express.static(resolve(__dirname, 'dist/assets')));

server.all('*', (request, response) => {
	return response.sendFile(resolve(__dirname, 'dist/index.html'));
});

server.listen(PORT, HOST, () => {
	console.info(`API server is running on ${HOST}:${PORT}`);
});