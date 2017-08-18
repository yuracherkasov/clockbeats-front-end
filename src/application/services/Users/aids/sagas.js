import * as Users from '../index';
import {
	all,
	put,
	call,
	fork,
	take,
	cancel,
	actionChannel,
} from 'redux-saga/effects';

import {
	USERS,
	usersListRequestAction,
	usersListRequestSucceededAction,
	usersListRequestFailedAction,
	usersFollowRequestSucceededAction,
	usersFollowRequestFailedAction,
} from './actions';

import {AUTH} from '../../Auth/aids/actions';

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

function* list() {
	const channel = yield actionChannel(USERS.LIST_REQUESTED);

	while (true) {
		yield take(channel);

		const actions = {
			resolve: usersListRequestSucceededAction,
			reject: usersListRequestFailedAction,
		};

		yield call(_call, Users.list, actions);
	}
}

function* follow() {
	const channel = yield actionChannel(USERS.FOLLOW_REQUEST);

	while (true) {
		const {payload} = yield take(channel);

		const actions = {
			resolve: usersFollowRequestSucceededAction,
			reject: usersFollowRequestFailedAction,
		};

		yield call(_call, Users.follow.bind(null, payload.user), actions);
	}
}

function* flow() {
	const connect = yield actionChannel([
		AUTH.SIGN_IN_SUCCEEDED,
		AUTH.SIGN_UP_SUCCEEDED,
		AUTH.VERIFY_TOKEN_SUCCEEDED,
	]);

	const disconnect = yield actionChannel([
		AUTH.SIGN_OUT_SUCCEEDED,
	]);

	while (true) {
		yield take(connect);
		const tasks = yield all([fork(follow), fork(list)]);
		yield put(usersListRequestAction());

		yield take(disconnect);
		yield cancel(...tasks);
	}
}

export default [
	fork(flow),
];