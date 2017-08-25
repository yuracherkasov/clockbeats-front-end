import IO from 'socket.io-client';

const HOST = process.env.NODE_ENV === 'production' ? 'http://188.166.28.121:81' : 'http://127.0.0.1:8095';

// TODO: Create /config.js
const CONFIG = {
	uri: HOST,
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

}

export default new SocketService();

