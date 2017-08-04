export const USER = {
	FETCH_REQUESTED: 'USER_FETCH_REQUESTED',
	FETCH_SUCCEEDED: 'USER_FETCH_SUCCEEDED',
	FETCH_FAILED: 'USER_FETCH_FAILED',
};

export function selfRequestAction(email) {
	return {type: USER.FETCH_REQUESTED, payload: {email}};
}

export function selfRequestSucceededAction(user) {
	return {type: USER.FETCH_SUCCEEDED, payload: {user}};
}

export function selfRequestFailedAction(error) {
	return {type: USER.FETCH_SUCCEEDED, payload: {error}};
}