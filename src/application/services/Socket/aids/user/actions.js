export const SOCKET_USER = {
	SUBSCRIBE_SUCCEEDED: 'SOCKET_SUBSCRIBE_SUCCEEDED',
	SUBSCRIBE_FAILED: 'SOCKET_SUBSCRIBE_FAILED',
	SUBSCRIBE_ERROR: 'SOCKET_SUBSCRIBE_ERROR',

	FRIENDS_ONLINE: 'SOCKET_FRIENDS_ONLINE',
	NOTIFICATION: 'SOCKET_NOTIFICATION',
	CHAT_MESSAGE: 'SOCKET_CHAT_MESSAGE',
};

export function socketSubscribeSucceededAction(friends) {
	return {type: SOCKET_USER.SUBSCRIBE_SUCCEEDED, payload: {friends}};
}

export function socketSubscribeFailedAction(error) {
	return {type: SOCKET_USER.SUBSCRIBE_FAILED, payload: {error}};
}

export function socketSubscribeErrorAction(error) {
	return {type: SOCKET_USER.SUBSCRIBE_ERROR, payload: {error}};
}

export function socketFriendsOnlineAction(friends) {
	return {type: SOCKET_USER.FRIENDS_ONLINE, payload: {friends}};
}

export function socketNotificationAction(notification) {
	return {type: SOCKET_USER.NOTIFICATION, payload: {notification}};
}

export function socketChatMessageAction(message) {
	return {type: SOCKET_USER.CHAT_MESSAGE, payload: {message}};
}