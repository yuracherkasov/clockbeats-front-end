import * as Auth from './../index';
import {
	call,
	put,
	takeLatest,
} from 'redux-saga/effects';

import {
	AUTH,
	signInSuccessAction,
	signUpSuccessAction,
	signInFailedAction,
	signUpFailedAction,
	verifyTokenSuccessAction,
	verifyTokenFailedAction,
} from './actions';

function* signIn({payload}) {
	try {
		const {email, password} = payload;
		const user = yield call(Auth.signIn, email, password);

		yield put(signInSuccessAction(user));
	} catch (error) {
		yield put(signInFailedAction(error.message));
	}
}

function* signUp({payload}) {
	try {
		const {email, password, username} = payload;
		const user = yield call(Auth.signUp, email, password, username);

		yield put(signUpSuccessAction(user));
	} catch (error) {
		yield put(signUpFailedAction(error.message));
	}
}

function* verify({payload}) {
	try {
		const {token} = payload;
		const user = yield call(Auth.verify, token);

		yield put(verifyTokenSuccessAction(user));
	} catch (error) {
		yield put(verifyTokenFailedAction(error.message));
	}
}


export const signSagas = [
	takeLatest(AUTH.SIGN_IN_REQUESTED, signIn),
	takeLatest(AUTH.SIGN_UP_REQUESTED, signUp),
	takeLatest(AUTH.VERIFY_TOKEN_REQUESTED, verify),
];