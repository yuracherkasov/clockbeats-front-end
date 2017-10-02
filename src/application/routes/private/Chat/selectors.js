import {createSelector} from 'reselect';

import head from 'lodash/head';
import uniq from 'lodash/uniq';
import compact from 'lodash/compact';


export const onlineSelector = createSelector(
	state => state.user,
	state => state.users,
	state => state.online,
	(self, users, online) => {
		return users
			.map(user => ({
				...user,
				online: !!head(online.filter(id => user.id === id)),
			}));
	}
);

export const roomsSelector = createSelector(
	state => state.user,
	onlineSelector,
	state => state.chats,
	(user, users, chats) => {
		return chats.map(chat => {
			const mappedUsers = chat.participants.map(participant => {
				if (participant === user.id) {
					return null;
				}

				return head(users.filter(person => person.id === participant));
			});
			return {
				...chat,
				participants: compact(mappedUsers),
				unread: chat.messages.filter(message => message.issuer !== user.id && message.pristine).length,
			};
		});
	}
);

// export const unreadSelector = createSelector(
// 	state => state.user,
// 	roomsSelector,
// 	(self, chats) => {
// 		return chats.map(chat => {
// 			return {
// 				room: chat.id,
// 				messages: ,
// 			};
// 		});
// 	}
// );

export const friends = createSelector(
	state => state.user,
	onlineSelector,
	state => state.contacts,
	(self, users, contacts) => {
		const {followers, following} = contacts;

		return uniq([...followers, ...following])
			.map(friend => {
				const result = users
					.filter(user => user.id === friend);
				return head(result);
			})
	}
);

export const roomsParticipantsSelector = createSelector(
	state => state.user,
	roomsSelector,
	(user, rooms) => {
		return rooms.map(room => ({
			roomId: room.id,
			recipient: head(room.participants.filter(participants => participants.id !== user.id)),
		}));
	}
);