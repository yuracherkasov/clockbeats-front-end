import {USER} from './actions';

const initialState = {};

export default (state = initialState, {type, payload}) => {
	switch (type) {
		case USER.FETCH_SUCCEEDED: {
			return {...payload.user};
		}

		case USER.FETCH_FAILED: {
			return {};
		}

		default: {
			return state;
		}
	}
}