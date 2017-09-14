import {WORKSPACE} from './actions';

const initial = [];

export default (state = initial, {type, payload}) => {
	switch (type) {
		case WORKSPACE.LIST_REQUEST_SUCCEEDED: {
			return [...payload.workspaces];
		}

		case WORKSPACE.CREATE_REQUEST_SUCCEEDED: {
			return [
				payload.workspace,
				...state,
			];
		}

		default: {
			return state;
		}
	}
}