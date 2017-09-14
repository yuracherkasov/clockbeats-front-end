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