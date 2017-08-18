import {all} from 'redux-saga/effects';

import applicationSagas from './services/Application/aids/sagas';
import browserMediaSagas from './services/Browser/Media/aids/sagas';
import signSagas from './services/Auth/aids/sagas';
import selfSagas from './services/Self/aids/sagas';
import socketConnectionSagas from './services/Socket/aids/connection/sagas';
import socketUserSagas from './services/Socket/aids/user/sagas';
import usersSagas from './services/Users/aids/sagas';

export default function* sagas() {
	yield all([
		...applicationSagas,
		...browserMediaSagas,
		...signSagas,
		...selfSagas,
		...usersSagas,
		...socketConnectionSagas,
		...socketUserSagas,
	])
}