import * as User from './../index';
import {
	all,
	put,
	fork,
	take,
	call,
	cancel,
	actionChannel,
} from 'redux-saga/effects';

import {AUTH} from '../../Auth/aids/actions';

import {
	USER,
	selfRequestAction,
	selfRequestSucceededAction,
	selfRequestFailedAction,
} from './actions';

function* _call(fn, {resolve, reject}) {
	try {
		const {status, data, error} = yield call(fn);

		if (status !== 200) {
			return yield put(reject(error.message));
		}

		yield put(resolve(data));
	} catch(error) {
		yield put(reject(error.message));
	}
}

function* self() {
	const channel = yield actionChannel(USER.SELF_REQUESTED);

	while (true) {
		yield take(channel);

		const actions = {
			resolve: selfRequestSucceededAction,
			reject: selfRequestFailedAction,
		};

		yield call(_call, User.self, actions);
	}
}

function* profile() {
	const channel = yield actionChannel('PROFILE');

	while (true) {
		yield take(channel);

		const actions = {
			resolve: (profile) => ({type: 'PROFILE_SUCCEEDED', payload: {profile}}),
			reject: (error) => ({type: 'PROFILE_FAILED', payload: {error}}),
		};

		yield call(_call, User.profile, actions);
	}
}

function* flow() {
	const channel = yield actionChannel([
		AUTH.SIGN_IN_SUCCEEDED,
		AUTH.SIGN_UP_SUCCEEDED,
		AUTH.VERIFY_TOKEN_SUCCEEDED,
	]);

	while(true) {
		yield take(channel);
		const tasks = yield all([fork(self), fork(profile)]);

		yield all([
			put(selfRequestAction())
		]);

		yield take(AUTH.SIGN_OUT_SUCCEEDED);
		yield cancel(...tasks);
	}
}

export default [
	fork(flow),
];