export const CONTACTS = {
	LIST_REQUESTED: 'CONTACTS_LIST_REQUESTED',
	LIST_REQUEST_SUCCEEDED: 'CONTACTS_LIST_REQUEST_SUCCEEDED',
	LIST_REQUEST_FAILED: 'CONTACTS_LIST_REQUEST_FAILED',

	UPDATED: 'CONTACTS_UPDATED',
};

export function contactsRequestedListAction() {
	return {type: CONTACTS.LIST_REQUESTED};
}

export function contactsRequestSucceededListAction({followers, following}) {
	return {type: CONTACTS.LIST_REQUEST_SUCCEEDED, payload: {followers, following}};
}

export function contactsRequestFailedListAction(error) {
	return {type: CONTACTS.LIST_REQUEST_FAILED, payload: {error}};
}

export function contactsUpdatedAction({followers, following}) {
	return {type: CONTACTS.UPDATED, payload: {followers, following}};
}