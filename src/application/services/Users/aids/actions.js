export const USERS = {
	LIST_REQUESTED: 'LIST_REQUESTED',
	LIST_REQUEST_SUCCEEDED: 'LIST_REQUEST_SUCCEEDED',
	LIST_REQUEST_FAILED: 'LIST_REQUESTED_FAILED',

	FOLLOW_REQUEST: 'FOLLOW_REQUEST',
	FOLLOW_REQUEST_SUCCEEDED: 'FOLLOW_REQUEST_SUCCEEDED',
	FOLLOW_REQUEST_FAILED: 'FOLLOW_REQUEST_FAILED',
};

export function usersListRequestAction() {
	return {type: USERS.LIST_REQUESTED};
}

export function usersListRequestSucceededAction({users}) {
	return {type: USERS.LIST_REQUEST_SUCCEEDED, payload: {users}};
}

export function usersListRequestFailedAction(error) {
	return {type: USERS.LIST_REQUEST_FAILED, payload: {error}};
}

export function usersFollowRequestAction(user) {
	return {type: USERS.FOLLOW_REQUEST, payload: {user}};
}

export function usersFollowRequestSucceededAction({user}) {
	return {type: USERS.FOLLOW_REQUEST_SUCCEEDED, payload: {user}};
}

export function usersFollowRequestFailedAction(error) {
	return {type: USERS.FOLLOW_REQUEST_FAILED, payload: {error}};
}