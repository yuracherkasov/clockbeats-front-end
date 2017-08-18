import Request from '../Request';

export function one(id) {
	return Request.get(`users/${id}`);
}

export function list() {
	return Request.get('users');
}

export function profile(username) {
	return Request.get(`users/${username}`);
}

export function follow(user) {
	return Request.post(`users/${user}/relationships`, {action: 'follow'});
}

export function unfollow(user) {
	return Request.post(`users/${user}/relationships`, {action: 'unfollow'});
}