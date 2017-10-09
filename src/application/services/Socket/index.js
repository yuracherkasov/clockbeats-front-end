import IO from 'socket.io-client';
import {ORIGIN} from '../../../../common.config';

// TODO: Move to common.config.js
const CONFIG = {
	uri: ORIGIN,
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

