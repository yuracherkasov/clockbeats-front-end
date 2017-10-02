export const WORKSPACE = {
	LIST_REQUESTED: 'workspace/list/REQUESTED',
	LIST_REQUEST_SUCCEEDED: 'workspace/list/SUCCEEDED',
	LIST_REQUEST_FAILED: 'workspace/list/FAILED',

	CREATE_REQUESTED: 'workspace/create/REQUESTED',
	CREATE_REQUEST_SUCCEEDED: 'workspace/create/SUCCEEDED',
	CREATE_REQUEST_FAILED: 'workspace/create/FAILED',
};

export function workspaceListRequestAction() {
	return {type: WORKSPACE.LIST_REQUESTED};
}
export function workspaceListRequestSucceededAction({workspaces}) {
	return {type: WORKSPACE.LIST_REQUEST_SUCCEEDED, payload: {workspaces}};
}
export function workspaceListRequestFailedAction(error) {
	return {type: WORKSPACE.LIST_REQUEST_FAILED, payload: {error}};
}

export function workspaceCreateRequestAction({title, description, start, end, participants}) {
	return {type: WORKSPACE.CREATE_REQUESTED, payload: {title, description, start, end, participants}};
}
export function workspaceCreateRequestSucceededAction({workspace}) {
	return {type: WORKSPACE.CREATE_REQUEST_SUCCEEDED, payload: {workspace}};
}
export function workspaceCreateRequestFailedAction(error) {
	return {type: WORKSPACE.CREATE_REQUEST_FAILED, payload: {error}};
}

export const ARGUMENTS = {
	LIST_REQUESTED: 'arguments/list/REQUESTED',
	LIST_REQUEST_SUCCEEDED: 'arguments/list/SUCCEEDED',
	LIST_REQUEST_FAILED: 'arguments/list/FAILED',

	CREATE_REQUESTED: 'arguments/create/REQUESTED',
	CREATE_REQUEST_SUCCEEDED: 'arguments/create/SUCCEEDED',
	CREATE_REQUEST_FAILED: 'arguments/create/FAILED',

	UPDATE_REQUESTED: 'arguments/update/REQUESTED',
	UPDATE_REQUEST_SUCCEEDED: 'arguments/update/SUCCEEDED',
	UPDATE_REQUEST_FAILED: 'arguments/update/FAILED',

	REMOVE_REQUESTED: 'arguments/remove/REQUESTED',
	REMOVE_REQUEST_SUCCEEDED: 'arguments/remove/SUCCEEDED',
	REMOVE_REQUEST_FAILED: 'arguments/remove/FAILED',

	LIKE_REQUESTED: 'arguments/like/REQUESTED',
	LIKE_REQUEST_SUCCEEDED: 'arguments/like/SUCCEEDED',
	LIKE_REQUEST_FAILED: 'arguments/like/FAILED',

	VOTE_REQUESTED: 'arguments/vote/REQUESTED',
	VOTE_REQUEST_SUCCEEDED: 'arguments/vote/SUCCEEDED',
	VOTE_REQUEST_FAILED: 'arguments/vote/FAILED',
};


export function argumentCreateRequestedAction({issuer, body, media, workspace}) {
	return {type: ARGUMENTS.CREATE_REQUESTED, payload: {issuer, body, media, workspace}};
}

export function argumentCreateRequestSucceededAction({argue}) {
	return {type: ARGUMENTS.CREATE_REQUEST_SUCCEEDED, payload: {argue}};
}

export function argumentCreateRequestFailedAction(error) {
	return {type: ARGUMENTS.CREATE_REQUEST_FAILED, payload: {error}};
}