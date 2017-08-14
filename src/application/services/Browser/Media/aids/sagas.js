import {eventChannel} from 'redux-saga';
import {call, fork, put, take} from 'redux-saga/effects';
import {APP} from '../../../Application/aids/actions';
import {mediaQuery} from '../index';


export function subscribe(medias) {
	return eventChannel(emit => mediaQuery.matches(medias, emit));
}

export function* subscribeToMediaQueries(medias) {
	const channel = yield call(subscribe, medias);

	while (true) {
		const action = yield take(channel);
		yield put(action);
	}
}


//=====================================
//  WATCHERS
//-------------------------------------

export function* watchInitApp() {
	while (true) {
		const {payload} = yield take(APP.INITIALIZE);
		yield fork(subscribeToMediaQueries, payload.media);
	}
}


//=====================================
//  ROOT
//-------------------------------------

export default [
	fork(watchInitApp)
];