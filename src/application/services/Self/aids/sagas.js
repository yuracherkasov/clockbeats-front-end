import * as User from './../index';
import {
	call,
	put,
	takeLatest,
} from 'redux-saga/effects';

import {
	USER,
	selfRequestSucceededAction,
	selfRequestFailedAction,
} from './actions';

function* selfRequest({payload}) {
	try {
		const {email} = payload;
		const user = yield call(User.self, email);

		yield put(selfRequestSucceededAction(user));
	} catch (error) {
		yield put(selfRequestFailedAction(error));
	}
}

export const selfSagas = [
	takeLatest(USER.FETCH_REQUESTED, selfRequest),
];