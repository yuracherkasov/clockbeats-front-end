import * as Workspace from '../index';
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
	WORKSPACE,
	workspaceListRequestAction,
	workspaceListRequestSucceededAction,
	workspaceListRequestFailedAction,
	workspaceCreateRequestAction,
	workspaceCreateRequestSucceededAction,
	workspaceCreateRequestFailedAction,
} from './actions';
import {AUTH} from '../../Auth/aids/actions';

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
	const channel = yield actionChannel(WORKSPACE.LIST_REQUESTED);

	while(true) {
		yield take(channel);

		const actions = {
			resolve: workspaceListRequestSucceededAction,
			reject: workspaceListRequestFailedAction,
		};

		yield call(_call, Workspace.list, actions);
	}
}

function* create() {
	const channel = yield actionChannel(WORKSPACE.CREATE_REQUESTED);

	while (true) {
		const {payload} = yield take(channel);

		const actions = {
			resolve: workspaceCreateRequestSucceededAction,
			reject: workspaceCreateRequestFailedAction,
		};

		yield call(_call, Workspace.create.bind(null, payload), actions);
	}
}

function* workspaceFlow() {
	const connect = yield actionChannel([
		AUTH.SIGN_IN_SUCCEEDED,
		AUTH.SIGN_UP_SUCCEEDED,
		AUTH.VERIFY_TOKEN_SUCCEEDED,
	]);
	const disconnect = yield actionChannel(AUTH.SIGN_OUT_SUCCEEDED);

	while(true) {
		yield take(connect);
		const tasks = yield all([
			fork(list),
			fork(create),
		]);

		yield put(workspaceListRequestAction());

		yield take(disconnect);
		yield cancel(...tasks);
	}
}

export default [
	fork(workspaceFlow),
];
