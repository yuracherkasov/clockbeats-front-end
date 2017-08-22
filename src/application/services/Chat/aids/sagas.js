import * as Chat from '../index';
import {
	all,
	put,
	fork,
	take,
	takeEvery,
	call,
	cancel,
	actionChannel,
} from 'redux-saga/effects';
import history from '../../../history';

import {
	CHAT,
	chatListRequestAction,
	chatListRequestSucceededAction,
	chatListRequestFailedAction,
	chatCrateRequestSucceededAction,
	chatCrateRequestFailedAction,
	chatRequestSucceededAction,
	chatRequestFailedAction,
} from './actions';

import {AUTH} from '../../Auth/aids/actions';
import {USER} from '../../Self/aids/actions';
import {SOCKET_USER} from '../../Socket/aids/user/actions';

function* _call(fn, {resolve, reject}) {
	try {
		const {status, data, error} = yield call(fn);

		if (status !== 200) {
			return yield put(reject(error.message));
		}

		yield put(resolve(data));
	} catch (error) {
		yield put(reject(error.message));
	}
}

function* list() {
	const channel = yield actionChannel(CHAT.LIST_REQUESTED);
	const actions = {
		resolve: chatListRequestSucceededAction,
		reject: chatListRequestFailedAction,
	};

	while (true) {
		yield take(channel);
		yield call(_call, Chat.list, actions);
	}
}

function* create() {
	const channel = yield actionChannel(CHAT.CREATE_REQUESTED);
	const actions = {
		resolve: chatCrateRequestSucceededAction,
		reject: chatCrateRequestFailedAction,
	};

	while (true) {
		const {payload} = yield take(channel);
		yield call(_call, Chat.create.bind(null, payload.participants), actions);
	}
}

function* redirect() {
	const channel = yield actionChannel(CHAT.CREATE_REQUEST_SUCCEEDED);

	while (true) {
		const {payload} = yield take(channel);
		yield call(history.push, `/you/chat/${payload.chat.id}`);
	}
}

function* specific() {
	const channel = yield actionChannel(CHAT.REQUESTED);
	const actions = {
		resolve: chatRequestSucceededAction,
		reject: chatRequestFailedAction,
	};

	while (true) {
		const {payload} = yield take(channel);
		yield call(_call, Chat.one.bind(null, payload.chat), actions);
	}
}

function* read() {
	const channel = yield actionChannel(USER.SELF_REQUEST_SUCCEEDED);

	while (true) {
		yield take(channel);
		yield all([
			fork(list),
			fork(create),
			fork(redirect),
			fork(specific),
		]);

		yield put(chatListRequestAction());
	}
}

function* flow() {
	const connect = yield actionChannel([
		AUTH.SIGN_IN_SUCCEEDED,
		AUTH.SIGN_UP_SUCCEEDED,
		AUTH.VERIFY_TOKEN_SUCCEEDED,
	]);

	const disconnect = yield actionChannel(AUTH.SIGN_OUT_SUCCEEDED);

	while (true) {
		yield take(connect);
		const task = yield fork(read);

		yield take(disconnect);
		yield cancel(task);
	}
}

export default [
	fork(flow),
];