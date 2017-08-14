import Request from '../Request';

export function self() {
	return Request.get('self');
}

export function contacts() {
	return Request.get('self/relationships');
}

export function profile() {
	return Request.get('self/profile');
}