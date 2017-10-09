const express = require('express');
const server = express();
const {resolve} = require('path');

server.set('port', (process.env.PORT || 3000));

server.use('/assets', express.static(resolve(__dirname, 'dist/assets')));

server.all('*', (request, response) => {
	return response.sendFile(resolve(__dirname, 'dist/index.html'));
});

server.listen(server.get('port'), () => {
	console.info(`API server is running on ${server.get('port')}`);
});