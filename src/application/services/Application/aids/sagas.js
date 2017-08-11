import Storage from '../../Storage';
import {delay} from 'redux-saga';
import {
	put,
	fork,
	take,
	call,
	cancel,
	takeEvery,
} from 'redux-saga/effects';

import {
	APP,
	initializedAction,
	initializationAction,
} from './actions';

import {
	AUTH,
	verifyTokenRequestAction
} from '../../Auth/aids/actions';

function* verifyTokenRequest() {
	try {
		const token = Storage.token;

		if (token) {
			yield put(verifyTokenRequestAction(token.token));
		}

	} catch (error) {}
}

function* initializationFlow() {
	while (true) {
		yield take([
			AUTH.VERIFY_TOKEN_REQUESTED,
			AUTH.SIGN_IN_REQUESTED,
			AUTH.SIGN_UP_REQUESTED,
		]);

		yield put(initializationAction());

		yield take([
			AUTH.VERIFY_TOKEN_SUCCEEDED,
			AUTH.SIGN_IN_SUCCEEDED,
			AUTH.SIGN_UP_SUCCEEDED,
			AUTH.VERIFY_TOKEN_FAILED,
			AUTH.SIGN_IN_FAILED,
			AUTH.SIGN_UP_FAILED,
		]);

		// TODO: remove DELAY
		yield delay(2000);
		yield put(initializedAction());
	}
}

export default [
	fork(initializationFlow),
	takeEvery(APP.INITIALIZE, verifyTokenRequest),
];