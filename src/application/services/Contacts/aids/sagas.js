import * as Contacts from '../index';
import {
	all,
	put,
	fork,
	take,
	call,
	cancel,
	actionChannel,
} from 'redux-saga/effects';

import {
	CONTACTS,
	contactsUpdatedAction,
	contactsRequestedListAction,
	contactsRequestSucceededListAction,
	contactsRequestFailedListAction,
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

function* fromSocket() {
	const channel = yield actionChannel(SOCKET_USER.FOLLOWERS_UPDATED);

	while (true) {
		const {payload} = yield take(channel);

		yield put(contactsUpdatedAction(payload));
	}
}

function* friends() {
	const channel = yield actionChannel(CONTACTS.LIST_REQUESTED);
	const actions = {
		resolve: contactsRequestSucceededListAction,
		reject: contactsRequestFailedListAction,
	};

	while (true) {
		yield take(channel);

		yield call(_call, Contacts.friends, actions);
	}
}

function* read() {
	const channel = yield actionChannel(USER.SELF_REQUEST_SUCCEEDED);

	while (true) {
		yield take(channel);
		yield all([
			fork(friends),
			fork(fromSocket),
		]);

		yield put(contactsRequestedListAction());
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