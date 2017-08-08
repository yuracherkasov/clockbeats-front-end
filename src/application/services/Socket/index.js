import IO from 'socket.io-client';

// TODO: Create /config.js
const CONFIG = {
	uri: 'http://127.0.0.1:8095',
	options: {
		forceNew: false,
		autoConnect: false,
		transports: ['websocket'],
		upgrade: false,
		reconnection: true,
		reconnectionAttempts: 5,
		reconnectionDelay: 1000,
		reconnectionDelayMax: 3000,
		timeout: 5000,
	}
};

class SocketService {
	constructor() {}

	subscribe = ({token}) => {
		if (!token) throw new Error('To open connection to the server you should provide USER TOKEN');

		this.socket = new IO(CONFIG.uri, {...CONFIG.options, query: {token}});

		return Promise.resolve(this.socket).then(socket => socket.open());
	};

	unsubscribe = () => {
		this.socket.close();
		this.socket.removeAllListeners();
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

