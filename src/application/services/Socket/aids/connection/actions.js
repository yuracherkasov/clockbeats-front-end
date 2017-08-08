export const SOCKET_CONNECTION = {
	PING: '@@SOCKET_ping',
	PONG: '@@SOCKET_pong',
	ERROR: '@@SOCKET_error',
	DISCONNECT: '@@SOCKET_disconnect',
	CONNECT: '@@SOCKET_connect',
	CONNECT_ERROR: '@@SOCKET_connect_error',
	CONNECT_TIMEOUT: '@@SOCKET_connect_timeout',
	RECONNECT: '@@SOCKET_reconnect',
	RECONNECTING: '@@SOCKET_reconnecting',
	RECONNECT_ERROR: '@@SOCKET_reconnect_error',
	RECONNECT_FAILED: '@@SOCKET_reconnect_failed',
	RECONNECT_ATTEMPT: '@@SOCKET_reconnect_attempt',
};

/* PING */
export function socketPing() {
	return {type: SOCKET_CONNECTION.PING};
}

/* PONG */
export function socketPong(latency) {
	return {type: SOCKET_CONNECTION.PONG, payload: {latency}};
}

/* ERROR */
export function socketErrorAction(error) {
	return {type: SOCKET_CONNECTION.ERROR, payload: {error: error.message}};
}

/* DISCONNECT */
export function socketDisconnectAction(reason) {
	return {type: SOCKET_CONNECTION.DISCONNECT, payload: {disconnected: reason}};
}

/* CONNECT */
export function socketConnectAction() {
	return {type: SOCKET_CONNECTION.CONNECT};
}
export function socketConnectionErrorAction(error) {
	return {type: SOCKET_CONNECTION.CONNECT_ERROR, payload: {error: error.message}};
}
export function socketConnectionTimeoutAction(timeout) {
	return {type: SOCKET_CONNECTION.CONNECT_TIMEOUT, payload: {timeout}};
}

/* RECONNECT */
export function socketReconnectAction(attempt) {
	return {type: SOCKET_CONNECTION.RECONNECT, payload: {attempt}};
}
export function socketReconnectingAction(attempt) {
	return {type: SOCKET_CONNECTION.RECONNECTING, payload: {attempt}};
}
export function socketReconnectErrorAction(error) {
	return {type: SOCKET_CONNECTION.RECONNECT_ERROR, payload: {error: error.message}};
}
export function socketReconnectFailedAction() {
	return {type: SOCKET_CONNECTION.RECONNECT_FAILED};
}
export function socketReconnectAttemptAction(attempt) {
	return {type: SOCKET_CONNECTION.RECONNECT_ATTEMPT, payload: {attempt}};
}