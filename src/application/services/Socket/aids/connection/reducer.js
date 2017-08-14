import {SOCKET_CONNECTION} from './actions';
import {AUTH} from '../../../Auth/aids/actions';

const initialState = {
	online: false,
	errors: [],
	timeout: false,
	attempts: 0,
	disconnected: '',
};

export default (state = initialState, {type, payload}) => {
	switch (type) {

		case SOCKET_CONNECTION.CONNECT: {
			return {
				...state,
				online: true,
			};
		}

		case SOCKET_CONNECTION.RECONNECT:
		case SOCKET_CONNECTION.RECONNECTING:
		case SOCKET_CONNECTION.RECONNECT_ATTEMPT: {
			return {
				...state,
				online: false,
				attempts: payload.attempt,
			};
		}

		case SOCKET_CONNECTION.ERROR:
		case SOCKET_CONNECTION.CONNECT_ERROR:
		case SOCKET_CONNECTION.RECONNECT_ERROR: {
			return {
				...state,
				online: false,
				errors: [...state.errors, payload.error],
			};
		}

		case SOCKET_CONNECTION.RECONNECT_FAILED: {
			return {
				...state,
				online: false,
				errors: [...state.errors, 'Can not reconnect to the server'],
			};
		}

		case SOCKET_CONNECTION.CONNECT_TIMEOUT: {
			return {
				...state,
				online: false,
				errors: [...state.errors, `Connection timeout. ${payload.timeout}`],
			};
		}

		case AUTH.SIGN_OUT_SUCCEEDED: {
			return initialState;
		}

		default: {
			return state;
		}
	}
}