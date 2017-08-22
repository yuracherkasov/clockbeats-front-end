import {CONTACTS} from './actions';

const initial = {
	followers: [],
	following: [],
};

export default (state = initial, {type, payload}) => {
	switch (type) {

		case CONTACTS.UPDATED:
		case CONTACTS.LIST_REQUEST_SUCCEEDED: {
			return {
				followers: [...payload.followers],
				following: [...payload.following],
			}
		}

		default: {
			return state;
		}
	}
}