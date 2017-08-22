export const NOTIFICATIONS = {
	LIST_REQUESTED: 'NOTIFICATIONS_LIST_REQUESTED',
	LIST_REQUESTED_SUCCEEDED: 'NOTIFICATIONS_LIST_REQUESTED_SUCCEEDED',
	LIST_REQUESTED_FAILED: 'NOTIFICATIONS_LIST_REQUESTED_FAILED',

	FROM_SOCKET: 'NOTIFICATIONS_FROM_SOCKET',
};

export function notificationsListRequestAction() {
	return {type: NOTIFICATIONS.LIST_REQUESTED};
}

export function notificationsListRequestSucceededAction({notifications}) {
	return {type: NOTIFICATIONS.LIST_REQUESTED_SUCCEEDED, payload: {notifications}};
}

export function notificationsListRequestFailedAction(error) {
	return {type: NOTIFICATIONS.LIST_REQUESTED_FAILED, payload: {error}};
}

export function notificationSocketReceived(notification) {
	return {type: NOTIFICATIONS.FROM_SOCKET, payload: {notification}};
}