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