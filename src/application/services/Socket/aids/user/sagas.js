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
	socketFriendsOnlineAction,
	socketNotificationAction,
	socketChatMessageAction,
} from './actions';
import {SOCKET_CONNECTION} from '../connection/actions';

function subscription() {
	return eventChannel(emit => {
		Socket.listen('subscribe_succeeded')
			.then(result => emit(socketSubscribeSucceededAction(result)));

		Socket.listen('subscribe_failed')
			.then(error => emit(socketSubscribeFailedAction(error.message)));

		Socket.listen('subscribe_error')
			.then(error => emit(socketSubscribeErrorAction(error.message)));

		Socket.listen('friends_online')
			.then(users => emit(socketFriendsOnlineAction(users)));

		Socket.listen('notification')
			.then(notification => emit(socketNotificationAction(notification)));

		Socket.listen('chat_message')
			.then(message => emit(socketChatMessageAction(message)));

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