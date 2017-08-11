import Request from '../Request';

export function authorize(email, password, username) {
	return Request.post('authorize', {email, password, username});
}

export function authenticate(email, password) {
	return Request.post('authenticate', {email, password});
}

export function verify(token) {
	return Request.post('authenticate', {token});
}