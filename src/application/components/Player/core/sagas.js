import {eventChannel, delay} from 'redux-saga';
import {
	put,
	take,
	call,
	fork,
	select,
} from 'redux-saga/effects';

import {
	AUDIO,
	audioTrackSelectedAction,
} from './actions';

import {
	PLAYER_INITIAL_VOLUME,
	audio,
	initAudio,
	setVolume,
} from './audio';

import {APP} from '../../../services/Application/aids/actions';

// import { audio, initAudio, setVolume } from './audio-service';
// import { getPlayerTrack, getPlayerTracklistCursor } from './selectors';
// import { playerStorage } from './storage';


// export function* playNextTrack() {
// 	const cursor = yield select(getPlayerTracklistCursor);
// 	if (cursor.nextTrackId) {
// 		yield put(playerActions.playSelectedTrack(cursor.nextTrackId));
// 	}
// }

const playlist = [
	'https://s3-eu-west-1.amazonaws.com/clb-staging.ie/users/585978cc85472a22002f8a1e/1502185668487.wav',
	'https://s3-eu-west-1.amazonaws.com/clb-staging.ie/users/585978cc85472a22002f8a1e/1498046071624.mp3',
	'https://s3-eu-west-1.amazonaws.com/clb-staging.ie/users/585978cc85472a22002f8a1e/1498729098192.mp3',
	'https://s3-eu-west-1.amazonaws.com/clb-staging.ie/users/585978cc85472a22002f8a1e/1498729144822.mp3',
	'https://s3-eu-west-1.amazonaws.com/clb-staging.ie/users/585978cc85472a22002f8a1e/1499172570705.mp3',
	'https://s3-eu-west-1.amazonaws.com/clb-staging.ie/users/585978cc85472a22002f8a1e/1499263456142.mp3',
	'https://s3-eu-west-1.amazonaws.com/clb-staging.ie/users/585978cc85472a22002f8a1e/1499263489301.mp3',
	'https://s3-eu-west-1.amazonaws.com/clb-staging.ie/users/585978cc85472a22002f8a1e/1499263508611.mp3',
	'https://s3-eu-west-1.amazonaws.com/clb-staging.ie/users/585978cc85472a22002f8a1e/1499613748753.mp3',
	'https://s3-eu-west-1.amazonaws.com/clb-staging.ie/users/585978cc85472a22002f8a1e/1499618545485.mp3',
	'https://s3-eu-west-1.amazonaws.com/clb-staging.ie/users/585978cc85472a22002f8a1e/1499618588434.mp3',
	'https://s3-eu-west-1.amazonaws.com/clb-staging.ie/users/585978cc85472a22002f8a1e/1499781879585.mp3',
	'https://s3-eu-west-1.amazonaws.com/clb-staging.ie/users/585978cc85472a22002f8a1e/1499781912838.mp3',
	'https://s3-eu-west-1.amazonaws.com/clb-staging.ie/users/585978cc85472a22002f8a1e/1499781968334.mp3',
	'https://s3-eu-west-1.amazonaws.com/clb-staging.ie/users/585978cc85472a22002f8a1e/1498046071624.mp3',
	'https://s3-eu-west-1.amazonaws.com/clb-staging.ie/users/585978cc85472a22002f8a1e/1501332213615.mp3',
	'https://s3-eu-west-1.amazonaws.com/clb-staging.ie/users/585978cc85472a22002f8a1e/1501332280943.mp3',
	'https://s3-eu-west-1.amazonaws.com/clb-staging.ie/users/585978cc85472a22002f8a1e/1502185740676.mp3',
	'https://s3-eu-west-1.amazonaws.com/clb-staging.ie/users/585978cc85472a22002f8a1e/1502185788238.mp3',
	'https://s3-eu-west-1.amazonaws.com/clb-staging.ie/users/585978cc85472a22002f8a1e/1502198486858.mp3',
	'https://s3-eu-west-1.amazonaws.com/clb-staging.ie/users/585978cc85472a22002f8a1e/1502198528956.mp3',
	'https://s3-eu-west-1.amazonaws.com/clb-staging.ie/users/585978cc85472a22002f8a1e/1502198562698.mp3',
	'https://s3-eu-west-1.amazonaws.com/clb-staging.ie/users/585978cc85472a22002f8a1e/1502198593157.mp3',
	'https://s3-eu-west-1.amazonaws.com/clb-staging.ie/users/585978cc85472a22002f8a1e/1502198631106.mp3',
	'https://s3-eu-west-1.amazonaws.com/clb-staging.ie/users/585978cc85472a22002f8a1e/1502979813692.mp3',
	'https://s3-eu-west-1.amazonaws.com/clb-staging.ie/users/585978cc85472a22002f8a1e/1502979853175.mp3',
	'https://s3-eu-west-1.amazonaws.com/clb-staging.ie/users/585978cc85472a22002f8a1e/1502979883967.mp3',
	'https://s3-eu-west-1.amazonaws.com/clb-staging.ie/users/585978cc85472a22002f8a1e/1502979904659.mp3',
	'https://s3-eu-west-1.amazonaws.com/clb-staging.ie/users/585978cc85472a22002f8a1e/1502979929032.mp3',
	'https://s3-eu-west-1.amazonaws.com/clb-staging.ie/users/585978cc85472a22002f8a1e/1503304397552.mp3',
	'https://s3-eu-west-1.amazonaws.com/clb-staging.ie/users/585978cc85472a22002f8a1e/1503306493456.mp3',
	'https://s3-eu-west-1.amazonaws.com/clb-staging.ie/users/585978cc85472a22002f8a1e/1503306518260.mp3',
	'https://s3-eu-west-1.amazonaws.com/clb-staging.ie/users/585978cc85472a22002f8a1e/1503306542303.mp3',
	'https://s3-eu-west-1.amazonaws.com/clb-staging.ie/users/585978cc85472a22002f8a1e/1503307711448.mp3',
	'https://s3-eu-west-1.amazonaws.com/clb-staging.ie/users/585978cc85472a22002f8a1e/1503307749124.mp3',
	'https://s3-eu-west-1.amazonaws.com/clb-staging.ie/users/585978cc85472a22002f8a1e/1503307773439.mp3',
	'https://s3-eu-west-1.amazonaws.com/clb-staging.ie/users/585978cc85472a22002f8a1e/1503307801576.mp3',
	'https://s3-eu-west-1.amazonaws.com/clb-staging.ie/users/585978cc85472a22002f8a1e/1503650913856.mp3',
];

export function* playSelectedTrack() {
	const track = 'https://s3-eu-west-1.amazonaws.com/clb-staging.ie/users/585978cc85472a22002f8a1e/1499263489301.mp3';
	yield call(audio.load, track);
	yield call(audio.play);
}

// export function* saveVolumeToStorage({volume}) {
// 	yield call(playerStorage.setVolume, volume);
// }

// export function* setVolumeFromStorage() {
// 	let volume = yield call(playerStorage.getVolume);
// 	if (typeof volume !== 'number') volume = PLAYER_INITIAL_VOLUME;
// 	yield call(setVolume, volume);
// }

export function* subscribeToAudio() {
	const channel = yield call(eventChannel, initAudio);

	while (true) {
		const action = yield take(channel);
		yield put(action);
	}
}


//=====================================
//  WATCHERS
//-------------------------------------

// export function* watchAudioEnded() {
// 	while (true) {
// 		yield take(playerActions.AUDIO_ENDED);
// 		yield fork(playNextTrack);
// 	}
// }

// export function* watchAudioVolumeChanged() {
// 	while (true) {
// 		const { payload } = yield take(playerActions.AUDIO_VOLUME_CHANGED);
// 		yield fork(saveVolumeToStorage, payload);
// 	}
// }

export function* watchInitApp() {
	while (true) {
		yield take(APP.INITIALIZED);
		yield fork(subscribeToAudio);

		yield delay(3000);
		yield put(audioTrackSelectedAction({track: 'https://s3-eu-west-1.amazonaws.com/clb-staging.ie/users/585bb36ec125022200e0a895/1502185668487.wav'}));
	}
}

export function* watchPlaySelectedTrack() {
	while (true) {
		yield take(AUDIO.TRACK_SELECTED);
		yield fork(playSelectedTrack);
	}
}

//=====================================
//  ROOT
//-------------------------------------

export default [
	// fork(watchAudioEnded),
	// fork(watchAudioVolumeChanged),
	fork(watchInitApp),
	fork(watchPlaySelectedTrack)
];