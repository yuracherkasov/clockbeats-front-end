export const APP = {
	INITIALIZE: 'INITIALIZE',
	INITIALIZATION: 'INITIALIZATION',
	INITIALIZED: 'INITIALIZED',
};

export function initializeAction() {
	return {type: APP.INITIALIZE};
}

export function initializationAction() {
	return {type: APP.INITIALIZATION};
}

export function initializedAction() {
	return {type: APP.INITIALIZED};
}

