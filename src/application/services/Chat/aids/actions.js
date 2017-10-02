export const CHAT = {
	REQUESTED: 'CHAT_REQUESTED',
	REQUEST_SUCCEEDED: 'CHAT_REQUEST_SUCCEEDED',
	REQUEST_FAILED: 'CHAT_REQUEST_FAILED',

	LIST_REQUESTED: 'CHAT_LIST_REQUESTED',
	LIST_REQUEST_SUCCEEDED: 'CHAT_LIST_REQUEST_SUCCEEDED',
	LIST_REQUEST_FAILED: 'CHAT_LIST_REQUEST_FAILED',

	CREATE_REQUESTED: 'CHAT_CREATE_REQUESTED',
	CREATE_REQUEST_SUCCEEDED: 'CHAT_CREATE_REQUEST_SUCCEEDED',
	CREATE_REQUEST_FAILED: 'CHAT_CREATE_REQUEST_FAILED',

	JOIN: 'CHAT_JOIN',
	LEAVE: 'CHAT_LEAVE',

	SEND_MESSAGE_REQUESTED: 'CHAT_SEND_MESSAGE_REQUESTED',
	SEND_MESSAGE_REQUEST_SUCCEEDED: 'CHAT_SEND_MESSAGE_REQUEST_SUCCEEDED',
	SEND_MESSAGE_REQUEST_FAILED: 'CHAT_SEND_MESSAGE_REQUEST_FAILED',

	MESSAGE_RECEIVED: 'CHAT_MESSAGE_RECEIVED',

	READ_MESSAGES_RECEIVED: 'CHAT_READ_MESSAGES_RECEIVED',

	PRISTINE_MESSAGES_REQUESTED: 'CHAT_PRISTINE_MESSAGES_REQUESTED',
	PRISTINE_MESSAGES_REQUEST_SUCCEEDED: 'CHAT_PRISTINE_MESSAGES_SUCCEEDED',
	PRISTINE_MESSAGES_REQUEST_FAILED: 'CHAT_PRISTINE_MESSAGES_FAILED',
};

/* SPECIFIC */
export function chatRequestAction(chat) {
	return {type: CHAT.REQUESTED, payload: {chat}};
}

export function chatRequestSucceededAction({chat}) {
	return {type: CHAT.REQUEST_SUCCEEDED, payload: {chat}};
}

export function chatRequestFailedAction(error) {
	return {type: CHAT.REQUEST_FAILED, payload: {error}};
}

/* LIST */
export function chatListRequestAction() {
	return {type: CHAT.LIST_REQUESTED};
}

export function chatListRequestSucceededAction({chats}) {
	return {type: CHAT.LIST_REQUEST_SUCCEEDED, payload: {chats}};
}

export function chatListRequestFailedAction(error) {
	return {type: CHAT.LIST_REQUEST_FAILED, payload: {error}};
}

/* CREATE */
export function chatCrateRequestAction(participants) {
	return {type: CHAT.CREATE_REQUESTED, payload: {participants}};
}

export function chatCrateRequestSucceededAction({chat}) {
	return {type: CHAT.CREATE_REQUEST_SUCCEEDED, payload: {chat}};
}

export function chatCrateRequestFailedAction(error) {
	return {type: CHAT.CREATE_REQUEST_FAILED, payload: {error}};
}

/* JOIN */
export function chatJoin(chat) {
	return {type: CHAT.JOIN, payload: {chat}};
}

/* LEAVE */
export function chatLeave(chat) {
	return {type: CHAT.LEAVE, payload: {chat}};
}

/* SEND MESSAGE */
export function chatSendMessageRequestAction({room, issuer, body}) {
	return {type: CHAT.SEND_MESSAGE_REQUESTED, payload: {room, issuer, body}};
}

export function chatSendMessageRequestSucceededAction({room, message}) {
	return {type: CHAT.SEND_MESSAGE_REQUEST_SUCCEEDED, payload: {room, message}};
}

export function chatSendMessageRequestFailedAction(error) {
	return {type: CHAT.SEND_MESSAGE_REQUEST_FAILED, payload: {error}};
}

/* RECEIVE MESSAGE */
export function chatMessageReceivedRequestAction({room, message}) {
	return {type: CHAT.MESSAGE_RECEIVED, payload: {room, message}};
}

/* PRISTINE MESSAGES */
export function chatPristineMessagesRequestedAction({room, messages}) {
	return {type: CHAT.PRISTINE_MESSAGES_REQUESTED, payload: {room, messages}};
}

export function chatPristineMessagesRequestSucceededAction({room, messages}) {
	return {type: CHAT.PRISTINE_MESSAGES_REQUEST_SUCCEEDED, payload: {room, messages}};
}

export function chatPristineMessagesRequestFailedAction(error) {
	return {type: CHAT.PRISTINE_MESSAGES_REQUEST_FAILED, payload: {error}};
}

export function chatReadMessageRequestAction({room, messages}) {
	return {type: CHAT.READ_MESSAGES_RECEIVED, payload: {room, messages}};
}