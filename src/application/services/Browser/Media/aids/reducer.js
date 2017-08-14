import {MEDIA} from './actions';

const initialState = {
	media: {}
};

export default (state = initialState, {payload, type}) => {
	switch (type) {
		case MEDIA.QUERY_CHANGED:
			return {...state, media: payload.media};

		default:
			return state;
	}
}