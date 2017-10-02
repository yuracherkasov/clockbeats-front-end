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
	chatSendMessageRequestSucceededAction,
	chatSendMessageRequestFailedAction,
	chatMessageReceivedRequestAction,
	chatJoin,
	chatLeave,
	chatPristineMessagesRequestSucceededAction,
	chatPristineMessagesRequestFailedAction,
	chatReadMessageRequestAction,
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

function* join() {
	const channel = yield actionChannel(SOCKET_USER.CHAT_JOIN);

	while(true) {
		const {payload: {chat}} = yield take(channel);
		yield put(chatJoin(chat));
	}
}
function* leave() {
	const channel = yield actionChannel(SOCKET_USER.CHAT_LEAVE);

	while(true) {
		const {payload: {chat}} = yield take(channel);
		yield put(chatLeave(chat));
	}
}

function* sendMessage() {
	const channel = yield actionChannel(CHAT.SEND_MESSAGE_REQUESTED);
	const actions = {
		resolve: chatSendMessageRequestSucceededAction,
		reject: chatSendMessageRequestFailedAction,
	};

	while (true) {
		const {payload} = yield take(channel);
		yield call(_call, Chat.createMessage.bind(null, {...payload}), actions);
	}
}

function* receiveMessage() {
	const channel = yield actionChannel(SOCKET_USER.CHAT_MESSAGE);

	while (true) {
		const {payload} = yield take(channel);
		yield put(chatMessageReceivedRequestAction(payload));
	}
}

function* pristineMessages() {
	const channel = yield actionChannel(CHAT.PRISTINE_MESSAGES_REQUESTED);
	const actions = {
		resolve: chatPristineMessagesRequestSucceededAction,
		reject: chatPristineMessagesRequestFailedAction,
	};

	while (true) {
		const {payload} = yield take(channel);
		yield call(_call, Chat.pristineMessages.bind(null, payload.room, payload.messages), actions);
	}
}

function* readMessages() {
	const channel = yield actionChannel(SOCKET_USER.CHAT_MESSAGE_PRISTINE);

	while (true) {
		const {payload} = yield take(channel);
		yield put(chatReadMessageRequestAction(payload));
	}
}

function* read() {
	const channel = yield actionChannel(USER.SELF_REQUEST_SUCCEEDED);

	while (true) {
		yield take(channel);
		yield all([
			fork(list),
			fork(join),
			fork(leave),
			fork(create),
			fork(redirect),
			fork(specific),
			fork(sendMessage),
			fork(receiveMessage),
			fork(pristineMessages),
			fork(readMessages),
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