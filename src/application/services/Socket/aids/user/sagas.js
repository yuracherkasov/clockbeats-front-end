import Socket from '../../index';
import {eventChannel} from 'redux-saga';
import {
	put,
	call,
	fork,
	take,
	cancel,
	actionChannel,
} from 'redux-saga/effects';

import {
	SOCKET_USER,
	socketSubscribeSucceededAction,
	socketSubscribeFailedAction,
	socketSubscribeErrorAction,
	socketUsersOnlineAction,
	socketNotificationAction,
	socketChatJoin,
	socketChatLeave,
	socketChatMessageAction,
	socketChatMessagePristineAction,
	socketFollowersUpdatedAction,
} from './actions';
import {SOCKET_CONNECTION} from '../connection/actions';

function subscription() {
	return eventChannel(emit => {
		Socket.socket.on('subscribe_succeeded', result => emit(socketSubscribeSucceededAction(result)));

		Socket.socket.on('subscribe_failed', error => emit(socketSubscribeFailedAction(error.message)));

		Socket.socket.on('subscribe_error', error => emit(socketSubscribeErrorAction(error.message)));

		Socket.socket.on('online', users => emit(socketUsersOnlineAction(users)));

		Socket.socket.on('notification', notification => emit(socketNotificationAction(notification)));

		Socket.socket.on('chat_join', chat => emit(socketChatJoin(chat)));

		Socket.socket.on('chat_leave', chat => emit(socketChatLeave(chat)));

		Socket.socket.on('chat_message', message => emit(socketChatMessageAction(message)));

		Socket.socket.on('chat_message_pristine', message => emit(socketChatMessagePristineAction(message)));

		Socket.socket.on('followers_updated', contacts => emit(socketFollowersUpdatedAction(contacts)));

		return Socket.unsubscribe;
	});
}

function* read() {
	const channel = yield call(subscription);

	while (true) {
		const action = yield take(channel);
		yield put(action);
	}
}

function* flow() {
	const connect = yield actionChannel(SOCKET_CONNECTION.CONNECT);
	const disconnect = yield actionChannel(SOCKET_CONNECTION.DISCONNECT);

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