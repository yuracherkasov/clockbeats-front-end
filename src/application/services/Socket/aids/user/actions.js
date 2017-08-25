export const SOCKET_USER = {
	SUBSCRIBE_SUCCEEDED: 'SOCKET_SUBSCRIBE_SUCCEEDED',
	SUBSCRIBE_FAILED: 'SOCKET_SUBSCRIBE_FAILED',
	SUBSCRIBE_ERROR: 'SOCKET_SUBSCRIBE_ERROR',

	USERS_ONLINE: 'SOCKET_USERS_ONLINE',
	NOTIFICATION: 'SOCKET_NOTIFICATION',
	CHAT_JOIN: 'SOCKET_CHAT_JOIN',
	CHAT_LEAVE: 'SOCKET_CHAT_LEAVE',
	CHAT_MESSAGE: 'SOCKET_CHAT_MESSAGE',
	FOLLOWERS_UPDATED: 'SOCKET_FOLLOWERS_UPDATED',
};

/* SUBSCRIPTION */
export function socketSubscribeSucceededAction(online) {
	return {type: SOCKET_USER.SUBSCRIBE_SUCCEEDED, payload: {online}};
}

export function socketSubscribeFailedAction(error) {
	return {type: SOCKET_USER.SUBSCRIBE_FAILED, payload: {error}};
}

export function socketSubscribeErrorAction(error) {
	return {type: SOCKET_USER.SUBSCRIBE_ERROR, payload: {error}};
}

/* USERS ONLINE */
export function socketUsersOnlineAction(online) {
	return {type: SOCKET_USER.USERS_ONLINE, payload: {online}};
}

/* NOTIFICATIONS */
export function socketNotificationAction(notification) {
	return {type: SOCKET_USER.NOTIFICATION, payload: {notification}};
}

/* CHAT */
export function socketChatJoin(chat) {
	return {type: SOCKET_USER.CHAT_JOIN, payload: {chat}};
}

export function socketChatLeave(chat) {
	return {type: SOCKET_USER.CHAT_LEAVE, payload: {chat}};
}

export function socketChatMessageAction({room, message}) {
	return {type: SOCKET_USER.CHAT_MESSAGE, payload: {room, message}};
}

/* CONTACTS */
export function socketFollowersUpdatedAction({followers, following}) {
	return {type: SOCKET_USER.FOLLOWERS_UPDATED, payload: {followers, following}};
}