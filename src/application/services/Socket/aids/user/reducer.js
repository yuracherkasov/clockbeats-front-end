import {SOCKET_USER} from './actions';

export default (state = [], {type, payload}) => {

	switch (type) {
		case SOCKET_USER.FRIENDS_ONLINE: {
			return [...payload.friends];
		}

		case SOCKET_USER.SUBSCRIBE_SUCCEEDED: {
			return [...payload.friends];
		}

		default: {
			return state;
		}
	}
}