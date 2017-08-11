import * as Auth from './../index';
import Storage from '../../Storage';
import {
	call,
	put,
	takeLatest,
} from 'redux-saga/effects';

import {
	AUTH,
	signInSuccessAction,
	signUpSuccessAction,
	signOutSuccessAction,
	signInFailedAction,
	signUpFailedAction,
	signOutFailedAction,
	verifyTokenSuccessAction,
	verifyTokenFailedAction,
} from './actions';

function* signIn({payload}) {
	try {
		const {email, password} = payload;
		const {status, data, error} = yield call(Auth.authenticate, email, password);

		if (status === 200) {
			// TODO: create middleware
			Storage.token = {token: data.token};
			return yield put(signInSuccessAction(data));
		}

		Storage.token = null;
		yield put(signInFailedAction(error.message));
	} catch (error) {
		Storage.token = null;
		yield put(signInFailedAction(error.message));
	}
}

function* signUp({payload}) {
	try {
		const {email, password, username} = payload;
		const {status, data, error} = yield call(Auth.authorize, email, password, username);

		if (status === 200) {
			// TODO: create middleware
			Storage.token = {token: data.token};
			return yield put(signUpSuccessAction(data));
		}

		Storage.token = null;
		yield put(signUpFailedAction(error.message));
	} catch (error) {
		Storage.token = null;
		yield put(signUpFailedAction(error.message));
	}
}

function* singOut() {
	try {
		Storage.token = null;
		yield put(signOutSuccessAction());
	} catch (error) {
		yield put(signOutFailedAction(error));
	}
}

function* verify({payload}) {
	try {
		const {token} = payload;
		const {status, data, error} = yield call(Auth.verify, token);

		if (status === 200) {
			// TODO: create middleware
			Storage.token = {token: data.token};
			return yield put(verifyTokenSuccessAction(data));
		}

		Storage.token = null;
		yield put(verifyTokenFailedAction(error.message));
	} catch (error) {
		Storage.token = null;
		yield put(verifyTokenFailedAction(error.message));
	}
}


export default [
	takeLatest(AUTH.SIGN_IN_REQUESTED, signIn),
	takeLatest(AUTH.SIGN_UP_REQUESTED, signUp),
	takeLatest(AUTH.SIGN_OUT_REQUESTED, singOut),
	takeLatest(AUTH.VERIFY_TOKEN_REQUESTED, verify),
];