import Request from '../Request';

const WORKSPACE_URN = 'self/workspaces';

const ARGUMENTS_URN = 'argues';

export function list() {
	return Request.get(WORKSPACE_URN);
}

export function detail(workspace) {
	return Request.get(`${WORKSPACE_URN}/${workspace}`);
}

export function create({title, description, start, end, participants}) {
	return Request.post(WORKSPACE_URN, {title, description, start, end, participants});
}


export function listArgument(workspace) {
	return Request.get(`${WORKSPACE_URN}/${workspace}/${ARGUMENTS_URN}`);
}

export function createArgument(workspace, {issuer, body, media}) {
	return Request.post(`${WORKSPACE_URN}/${workspace}/${ARGUMENTS_URN}`, {issuer, body, media});
}

export function updateArgument(workspace, argument, {body, media}) {
	return Request.put(`${WORKSPACE_URN}/${workspace}/${ARGUMENTS_URN}/${argument}`, {body, media});
}

export function reactArgument(workspace, argument, {issuer, type, value}) {
	return Request.patch(`${WORKSPACE_URN}/${workspace}/${ARGUMENTS_URN}/${argument}`, {issuer, type, value});
}

export function deleteArgument(workspace, argument) {
	return Request.delete(`${WORKSPACE_URN}/${workspace}/${ARGUMENTS_URN}/${argument}`);
}