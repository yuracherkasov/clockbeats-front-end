export const USER = {
	SELF_REQUESTED: 'SELF_REQUESTED',
	SELF_REQUEST_SUCCEEDED: 'SELF_REQUEST_SUCCEEDED',
	SELF_REQUESTED_FAILED: 'SELF_REQUESTED_FAILED',
};

export function selfRequestAction() {
	return {type: USER.SELF_REQUESTED};
}

export function selfRequestSucceededAction({user}) {
	return {type: USER.SELF_REQUEST_SUCCEEDED, payload: {user}};
}

export function selfRequestFailedAction(error) {
	return {type: USER.SELF_REQUESTED_FAILED, payload: {error}};
}