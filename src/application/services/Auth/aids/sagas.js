import * as Auth from './../index';
import Storage from '../../Storage';
import {
	all,
	call,
	fork,
	take,
	put,
	flush,
	actionChannel,
} from 'redux-saga/effects';

import {
	AUTH,
	signInSuccessAction,
	signUpSuccessAction,
	signOutSuccessAction,
	signInFailedAction,
	signUpFailedAction,
	signOutFailedAction,
	verifyTokenRequestAction,
	verifyTokenSuccessAction,
	verifyTokenFailedAction,
} from './actions';

import {APP} from '../../Application/aids/actions';

function* _call(fn, {resolve, reject}) {
	try {
		const {status, data, error} = yield call(fn);

		if (status === 200) {
			const {token} = data;
			Storage.token = {token};
			return yield put(resolve(data));
		}

		Storage.token = null;
		yield put(reject(error.message));
	} catch (error) {
		Storage.token = null;
		yield put(reject(error.message));
	}
}

function* authenticate() {
	const channel = yield actionChannel(AUTH.SIGN_IN_REQUESTED);

	while (true) {
		const {payload} = yield take(channel);
		const {email, password} = payload;
		const actions = {
			resolve: signInSuccessAction,
			reject: signInFailedAction,
		};

		yield call(_call, Auth.authenticate.bind(null, email, password), actions);
	}
}

function* authorize() {
	const channel = yield actionChannel(AUTH.SIGN_UP_REQUESTED);

	while (true) {
		const {payload} = yield take(channel);
		const {email, password, username} = payload;
		const actions = {
			resolve: signUpSuccessAction,
			reject: signUpFailedAction,
		};

		yield call(_call, Auth.authorize.bind(null, email, password, username), actions);
	}
}

function* verify() {
	const channel = yield actionChannel(AUTH.VERIFY_TOKEN_REQUESTED);

	try {
		const {payload} = yield take(channel);
		const {token} = payload;
		const actions = {
			resolve: verifyTokenSuccessAction,
			reject: verifyTokenFailedAction,
		};

		yield call(_call, Auth.verify.bind(null, token), actions);

	} finally {
		yield flush(channel);
	}
}

function* signOut() {
	const channel = yield actionChannel(AUTH.SIGN_OUT_REQUESTED);

	while (true) {
		yield take(channel);
		yield put(signOutSuccessAction());
	}
}

function* token() {
	yield take(APP.INITIALIZE);
	const token = Storage.token;

	if (token) {
		yield put(verifyTokenRequestAction(token.token));
	}
}

function* flow() {
	yield all([
		call(verify),
		call(authorize),
		call(authenticate),
		call(signOut),
	]);
}


export default [
	fork(flow),
	call(token),
];