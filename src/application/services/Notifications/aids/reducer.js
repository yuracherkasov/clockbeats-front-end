import {NOTIFICATIONS} from './actions';

const initial = [];

export default (state = initial, {type, payload}) => {
	switch (type) {

		case NOTIFICATIONS.LIST_REQUESTED_SUCCEEDED: {
			return [...payload.notifications];
		}

		case NOTIFICATIONS.FROM_SOCKET: {
			return [
				...state,
				payload.notification
			];
		}

		case NOTIFICATIONS.LIST_REQUESTED_FAILED: {
			return initial;
		}

		default: {
			return state;
		}
	}
}