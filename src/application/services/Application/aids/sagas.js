import {delay} from 'redux-saga';
import {
	put,
	fork,
	take,
} from 'redux-saga/effects';

import {
	APP,
	initializeAction,
	initializedAction,
	initializationAction,
} from './actions';

import {AUTH} from '../../Auth/aids/actions';

function* watch() {
	yield take(APP.INITIALIZE);
	yield fork(initialization);
}

function* initialization() {
	while (true) {
		yield take([
			AUTH.VERIFY_TOKEN_REQUESTED,
			AUTH.SIGN_IN_REQUESTED,
			AUTH.SIGN_UP_REQUESTED,
		]);

		yield put(initializationAction());

		yield take([
			AUTH.SIGN_IN_SUCCEEDED,
			AUTH.SIGN_IN_FAILED,
			AUTH.SIGN_UP_SUCCEEDED,
			AUTH.SIGN_UP_FAILED,
			AUTH.VERIFY_TOKEN_SUCCEEDED,
			AUTH.VERIFY_TOKEN_FAILED,
		]);

		yield delay(600);
		yield put(initializedAction());
	}
}

export default [
	fork(watch),
	put(initializeAction()),
];