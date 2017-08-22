import {all} from 'redux-saga/effects';

import applicationSagas from './services/Application/aids/sagas';
import browserMediaSagas from './services/Browser/Media/aids/sagas';
import signSagas from './services/Auth/aids/sagas';
import selfSagas from './services/Self/aids/sagas';
import socketConnectionSagas from './services/Socket/aids/connection/sagas';
import socketUserSagas from './services/Socket/aids/user/sagas';
import usersSagas from './services/Users/aids/sagas';
import notificationsSagas from './services/Notifications/aids/sagas';
import contacts from './services/Contacts/aids/sagas';
import chatSagas from './services/Chat/aids/sagas';

// TODO: create initialize saga flow which will subscribe when sign in and unsubscribe when sign out
export default function* sagas() {
	yield all([
		...applicationSagas,
		...browserMediaSagas,
		...signSagas,
		...selfSagas,
		...notificationsSagas,
		...contacts,
		...chatSagas,
		...usersSagas,
		...socketConnectionSagas,
		...socketUserSagas,
	])
}