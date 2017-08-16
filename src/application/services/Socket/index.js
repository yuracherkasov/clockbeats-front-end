import IO from 'socket.io-client';

// TODO: Create /config.js
const CONFIG = {
	uri: 'http://127.0.0.1:8095',
	options: {
		forceNew: false,
		autoConnect: false,
		transports: ['websocket', 'polling'],
		upgrade: false,
		reconnection: true,
	}
};

class SocketService {
	constructor() {}

	subscribe = (query) => {
		const options = query ? {...CONFIG.options, query} : CONFIG.options;

		this.socket = new IO(CONFIG.uri, options);

		return Promise.resolve(this.socket.open());
	};

	unsubscribe = () => {
		this.socket.close();
		this.socket.removeAllListeners();
		this.socket = null;
	};

	listen = (event) => {
		const handler = (resolve, reject) => {
			if (Object.is(this.socket, null)) {
				reject(new Error('No socket connection found.'));
			}

			this.socket.on(event, resolve);
		};

		return new Promise(handler);
	};

	emit = (event, data) => {
		const handler = (resolve, reject) => {
			if (Object.is(this.socket, null)) {
				reject(new Error('No socket connection found.'));
			}

			this.socket.emit(event, data, resolve);
		};

		return new Promise(handler);
	}

}

export default new SocketService();

