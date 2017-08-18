import Request from '../Request';

export function one(id) {
	return Request.get(`self/notifications/${id}`);
}

export function list() {
	return Request.get('self/notifications');
}

export function update(id) {
	return Request.patch(`self/notifications/${id}`);
}

