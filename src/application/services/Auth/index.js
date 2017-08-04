import Reqest from '../Request';
import {uuid} from '../../utils/uuid';

export function signIn(email, password) {

	if (email !== 'admin@gmail.com' || password !== 'admin') {
		throw new Error('Bad Credentials');
	}

	return {
		user: {id: uuid(), email, name: 'Paolo Mantini', username: 'paolomantini'},
		token: 'paolomantini_token',
	};
}

export function signUp(email, password, username) {

	if (email === 'admin@gmail.com') {
		throw new Error('User already exist');
	}

	return {
		user: {id: uuid(), email, username, name: username},
		token: `${username}_token`,
	};
}

export function verify(token) {

	if (token !== 'paolomantini_token') {
		throw new Error('Bad token. Please, try to sign-in again');
	}

	return {
		user: {id: uuid(), email: 'admin@gmail.com', username: 'paolomantini', name: 'Paolo Mantini'},
		token: 'paolomantini_token',
	};
}