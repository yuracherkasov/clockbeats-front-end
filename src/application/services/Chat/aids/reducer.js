import {CHAT} from './actions';

const initial = [];

export default (state = initial, {type, payload}) => {
	switch (type) {

		case CHAT.LIST_REQUEST_SUCCEEDED: {
			return [...payload.chats];
		}

		case CHAT.CREATE_REQUEST_SUCCEEDED: {
			return [
				...state,
				payload.chat,
			];
		}

		case CHAT.LIST_REQUEST_FAILED: {
			return initial;
		}

		default: {
			return state;
		}
	}
}