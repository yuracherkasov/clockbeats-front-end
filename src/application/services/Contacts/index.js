import Request from '../Request';

export function friends() {
	return Request.get(`self/relationships`);
}

export function list(user) {
	return Request.get(`users/${user}/relationships`);
}

export function accept(user) {
	return Request.post(`users/${user}/relationships`, {action: 'accept'});
}

export function follow(user) {
	return Request.post(`users/${user}/relationships`, {action: 'follow'});
}

export function unfollow(user) {
	return Request.post(`users/${user}/relationships`, {action: 'unfollow'});
}