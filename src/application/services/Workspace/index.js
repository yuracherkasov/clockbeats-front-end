import Request from '../Request';

const WORKSPACE_URL = 'self/workspaces';

export function list() {
	return Request.get(WORKSPACE_URL);
}

export function detail(workspace) {
	return Request.get(`${WORKSPACE_URL}/${workspace}`);
}

export function create({title, description, start, end, participants}) {
	return Request.post(WORKSPACE_URL, {title, description, start, end, participants});
}