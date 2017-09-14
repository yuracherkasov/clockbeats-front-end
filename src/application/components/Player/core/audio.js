export const PLAYER_INITIAL_VOLUME = 10;
export const PLAYER_MAX_VOLUME = 100;
export const PLAYER_VOLUME_INCREMENT = 5;

import {
	audioEndedAction,
	audioPausedAction,
	audioPlayingAction,
	audioTimeUpdatedAction,
	audioVolumeChangedAction,
} from './actions';

let _audio = undefined;

export function initAudio(emit, audio = new Audio()) {
	audio.addEventListener('ended', () => emit(audioEndedAction()));
	audio.addEventListener('pause', () => emit(audioPausedAction()));
	audio.addEventListener('playing', () => emit(audioPlayingAction()));
	audio.addEventListener('timeupdate', event => emit(audioTimeUpdatedAction(getTimes(event))));
	audio.addEventListener('volumechange', () => emit(audioVolumeChangedAction(getVolume())));

	_audio = audio;
	return () => {};
}

export function getTimes(event) {
	const {buffered, currentTime, duration} = event.target;
	const bufferedTime = buffered.length ? buffered.end(0) : 0;

	return {
		bufferedTime,
		currentTime,
		duration,
		percentBuffered: `${(bufferedTime / duration * 100) || 0}%`,
		percentCompleted: `${(currentTime / duration * 100) || 0}%`,
	};
}

export function getVolume() {
	return Math.floor(_audio.volume * 100);
}

export function setVolume(volume) {
	_audio.volume = volume / 100;
}


export const audio = {
	decreaseVolume() {
		const volume = getVolume() - PLAYER_VOLUME_INCREMENT;
		if (volume >= 0) setVolume(volume);
	},

	increaseVolume() {
		const volume = getVolume() + PLAYER_VOLUME_INCREMENT;
		if (volume <= PLAYER_MAX_VOLUME) setVolume(volume);
	},

	load(url) {
		if (url) _audio.src = url;
	},

	pause() {
		_audio.pause();
	},

	play() {
		const promise = _audio.play();
		if (promise && promise.catch) promise.catch(error => console.error('Player error occurred\n', error));
	},

	seek(time) {
		_audio.currentTime = time;
	}
};