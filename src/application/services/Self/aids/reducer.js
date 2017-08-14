import {USER} from './actions';
import {AUTH} from '../../Auth/aids/actions';

const initialState = {};

export default (state = initialState, {type, payload}) => {
	switch (type) {
		case USER.SELF_REQUEST_SUCCEEDED: {
			return {...payload.user};
		}

		case AUTH.SIGN_OUT_SUCCEEDED:
		case USER.SELF_REQUESTED_FAILED: {
			return initialState;
		}

		default: {
			return state;
		}
	}
}