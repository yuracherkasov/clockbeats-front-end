import {SOCKET_USER} from './actions';

export default (state = [], {type, payload}) => {

	switch (type) {
		case SOCKET_USER.SUBSCRIBE_SUCCEEDED:
		case SOCKET_USER.USERS_ONLINE: {
			return [...payload.online];
		}

		default: {
			return state;
		}
	}
}