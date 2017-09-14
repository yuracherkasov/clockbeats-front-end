export const AUDIO = {
	ENDED: 'player/audio/ENDED',
	PAUSED: 'player/audio/PAUSED',
	PLAYING: 'player/audio/PLAYING',
	TIME_UPDATED: 'player/audio/TIME_UPDATED',
	VOLUME_CHANGED: 'player/audio/VOLUME_CHANGED',
	TRACK_SELECTED: 'player/audio/TRACK_SELECTED',
};

export function audioEndedAction() {
	return {type: AUDIO.ENDED};
}

export function audioPausedAction() {
	return {type: AUDIO.PAUSED};
}

export function audioPlayingAction() {
	return {type: AUDIO.PLAYING};
}

export function audioTimeUpdatedAction(times) {
	return {type: AUDIO.TIME_UPDATED, payload: {times}};
}

export function audioVolumeChangedAction(volume) {
	return {type: AUDIO.VOLUME_CHANGED, payload: {volume}};
}

export function audioTrackSelectedAction(track) {
	return {type:AUDIO.TRACK_SELECTED, payload: {track}};
}