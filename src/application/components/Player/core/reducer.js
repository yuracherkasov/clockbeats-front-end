import {Record} from 'immutable';
import {PLAYER_INITIAL_VOLUME} from './audio';
import {AUDIO} from './actions';

export const PlayerState = new Record({
	isPlaying: false,
	track: null,
	volume: PLAYER_INITIAL_VOLUME,
});


export function player(state = new PlayerState(), {payload, type}) {
	switch (type) {
		case AUDIO.ENDED:
		case AUDIO.PAUSED: {
			return state.set('isPlaying', false);
		}

		case AUDIO.PLAYING: {
			return state.set('isPlaying', true);
		}

		case AUDIO.VOLUME_CHANGED: {
			return state.set('volume', payload.volume);
		}

		case AUDIO.TRACK_SELECTED: {
			return state.merge({track: payload.track});
		}

		default: {
			return state;
		}
	}
}

export const PlayerTimesState = new Record({
	bufferedTime: 0,
	currentTime: 0,
	duration: 0,
	percentBuffered: '0%',
	percentCompleted: '0%'
});


export function playerTimes(state = new PlayerTimesState(), {payload, type}) {
	switch (type) {
		case AUDIO.ENDED:
		case AUDIO.TRACK_SELECTED: {
			return new PlayerTimesState();
		}

		case AUDIO.TIME_UPDATED: {
			return state.merge(payload.times);
		}

		default: {
			return state;
		}
	}
}