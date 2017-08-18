import {USERS} from './actions';

const initialState = [];

export default (state = initialState, {type, payload}) => {
	switch (type) {

		case USERS.LIST_REQUEST_SUCCEEDED: {
			return [...payload.users];
		}

		case USERS.LIST_REQUEST_FAILED: {
			return initialState;
		}

		default: {
			return state;
		}
	}
}