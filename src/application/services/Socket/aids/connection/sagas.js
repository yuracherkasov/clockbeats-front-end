import Socket from '../../index';
import Storage from '../../../Storage';
import {
	put,
	fork,
	take,
	call,
	cancel,
} from 'redux-saga/effects';
import {eventChannel} from 'redux-saga';
import {
	socketPing,
	socketPong,
	socketErrorAction,
	socketDisconnectAction,
	socketConnectAction,
	socketConnectionErrorAction,
	socketConnectionTimeoutAction,
	socketReconnectAction,
	socketReconnectingAction,
	socketReconnectErrorAction,
	socketReconnectFailedAction,
	socketReconnectAttemptAction,
} from './actions';

function subscription(socket) {
	return eventChannel(emit => {
		socket.on('ping', () => emit(socketPing()));
		socket.on('pong', (latency) => emit(socketPong(latency)));
		socket.on('error', (error) => emit(socketErrorAction(error)));
		socket.on('disconnect', (reason) => emit(socketDisconnectAction(reason)));

		socket.on('connect', () => emit(socketConnectAction()));
		socket.on('connect_error', (error) => emit(socketConnectionErrorAction(error)));
		socket.on('connect_timeout', (timeout) => emit(socketConnectionTimeoutAction(timeout)));

		socket.on('reconnect', (attempt) => emit(socketReconnectAction(attempt)));
		socket.on('reconnecting', (attempt) => emit(socketReconnectingAction(attempt)));
		socket.on('reconnect_attempt', (attempt) => emit(socketReconnectAttemptAction(attempt)));
		socket.on('reconnect_error', (error) => emit(socketReconnectErrorAction(error)));
		socket.on('reconnect_failed', () => emit(socketReconnectFailedAction()));

		return () => {};
	});
}

function* read(socket) {
	const channel = yield call(subscription, socket);

	while (true) {
		const action = yield take(channel);
		yield put(action);
	}
}

function* handleIO(socket) {
	yield fork(read, socket);
}

function* flow() {
	while (true) {
		const {payload} = yield take('SIGN_IN_SUCCEEDED');
		const socket = yield call(Socket.subscribe, {token: payload.token});
		const task = yield fork(handleIO, socket);

		yield take('SIGN_OUT_SUCCEEDED');
		yield call(Socket.unsubscribe);
		yield cancel(task);
	}
}

export default [
	fork(flow),
];