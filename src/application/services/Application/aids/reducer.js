import {APP} from './actions';

const initialState = {
	initialization: false,
};

export default (state = initialState, {type, action}) => {
	switch (type) {
		case APP.INITIALIZED:
		case APP.INITIALIZATION: {
			return {
				...state,
				initialization: !state.initialization,
			};
		}

		default: {
			return state;
		}
	}
}