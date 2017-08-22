import Request from '../Request';

export function one(id) {
	return Request.get(`self/chats/${id}`);
}

export function list() {
	return Request.get('self/chats');
}

export function create(participants) {
	return Request.post('self/chats', {participants});
}

// TODO: should call to DB with `skip` and DB should return `count of left messages`
export function messages(id, skip) {
	return Request.get(`self/chats/${id}/messages?${skip}`);
}

export function createMessage(chatId, {text}) {
	return Request.post(`self/chats/${chatId}/messages`, {text});
}

export function updateMessage(chatId, {id, text, persist = true, remove = false}) {
	return Request.patch(`self/chats/${chatId}/messages/${id}`, {text, persist, remove});
}

