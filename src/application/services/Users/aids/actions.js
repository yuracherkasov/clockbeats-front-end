export const USERS = {
	LIST_REQUESTED: 'USERS_LIST_REQUESTED',
	LIST_REQUEST_SUCCEEDED: 'USERS_LIST_REQUEST_SUCCEEDED',
	LIST_REQUEST_FAILED: 'USERS_LIST_REQUEST_FAILED',

	FOLLOW_REQUESTED: 'FOLLOW_REQUESTED',
	FOLLOW_REQUEST_SUCCEEDED: 'FOLLOW_REQUEST_SUCCEEDED',
	FOLLOW_REQUEST_FAILED: 'FOLLOW_REQUEST_FAILED',

	UNFOLLOW_REQUESTED: 'UNFOLLOW_REQUESTED',
	UNFOLLOW_REQUEST_SUCCEEDED: 'UNFOLLOW_REQUEST_SUCCEEDED',
	UNFOLLOW_REQUEST_FAILED: 'UNFOLLOW_REQUEST_FAILED',
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
	return {type: USERS.FOLLOW_REQUESTED, payload: {user}};
}

export function usersFollowRequestSucceededAction({user}) {
	return {type: USERS.FOLLOW_REQUEST_SUCCEEDED, payload: {user}};
}

export function usersFollowRequestFailedAction(error) {
	return {type: USERS.FOLLOW_REQUEST_FAILED, payload: {error}};
}

export function usersUnfollowRequestAction(user) {
	return {type: USERS.UNFOLLOW_REQUESTED, payload: {user}};
}

export function usersUnfollowRequestSucceededAction({user}) {
	return {type: USERS.UNFOLLOW_REQUEST_SUCCEEDED, payload: {user}};
}

export function usersUnfollowRequestFailedAction(error) {
	return {type: USERS.UNFOLLOW_REQUEST_FAILED, payload: {error}};
}