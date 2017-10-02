import {CHAT} from './actions';
import {head} from 'lodash';

const initial = [];

export default (state = initial, {type, payload}) => {
	switch (type) {

		case CHAT.LIST_REQUEST_SUCCEEDED: {
			return [...payload.chats];
		}

		case CHAT.JOIN: {
			return [
				payload.chat,
				...state,
			];
		}

		case CHAT.LEAVE: {
			return state.filter(chat => chat.id !== payload.chat.id);
		}

		case CHAT.MESSAGE_RECEIVED:
		case CHAT.SEND_MESSAGE_REQUEST_SUCCEEDED: {
			const {room, message} = payload;
			const selected = [];
			const rooms = state.filter(chat => {
				if (chat.id === room) {
					selected.push(chat);
					return false;
				}
				return true;
			});

			const updated = head(selected);
			const {messages} = updated;

			return [
				{...updated, messages: [...messages, message]},
				...rooms,
			];
		}

		case CHAT.READ_MESSAGES_RECEIVED:
		case CHAT.PRISTINE_MESSAGES_REQUEST_SUCCEEDED: {
			const {room, messages: messagesPristine} = payload;

			return state.map(chat => {
				if (chat.id === room) {
					const {messages} = chat;

					const updated = messages.map(message => {
						if (messagesPristine.indexOf(message.id) !== -1) {
							return {
								...message,
								pristine: false,
							};
						}

						return message;
					});

					return {
						...chat,
						messages: updated,
					}
				}

				return chat;
			});
		}

		case CHAT.LIST_REQUEST_FAILED: {
			return initial;
		}

		default: {
			return state;
		}
	}
}