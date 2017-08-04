import {delay} from 'redux-saga';

export function* self(email) {
	yield delay(1000);

	return {
		id: '9379992',
		email,
		name: 'Paolo Mantini',
		username: 'paolomantini',
	};
}