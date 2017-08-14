import {all} from 'redux-saga/effects';

import applicationSagas from './services/Application/aids/sagas';
import signSagas from './services/Auth/aids/sagas';
import selfSagas from './services/Self/aids/sagas';
import socketConnectionSagas from './services/Socket/aids/connection/sagas';

export default function* sagas() {
	yield all([
		...signSagas,
		...selfSagas,
		...socketConnectionSagas,
		...applicationSagas,
	])
}