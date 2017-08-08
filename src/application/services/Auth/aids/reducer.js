import {AUTH} from './actions';

const initialState = {};

export default (state = initialState, {type, payload}) => {
	switch (type) {
		case AUTH.VERIFY_TOKEN_SUCCEEDED:
		case AUTH.SIGN_IN_SUCCEEDED:
		case AUTH.SIGN_UP_SUCCEEDED: {

			return {...payload.user};
		}

		case AUTH.SIGN_OUT_SUCCEEDED:
		case AUTH.SIGN_OUT_FAILED:
		case AUTH.SIGN_IN_FAILED:
		case AUTH.SIGN_UP_FAILED: {
			return initialState;
		}

		default: {
			return state;
		}
	}
}