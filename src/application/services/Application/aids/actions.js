export const APP = {
	INITIALIZE: 'INITIALIZE',
	INITIALIZATION: 'INITIALIZATION',
	INITIALIZED: 'INITIALIZED',
};

export function initializeAction(payload) {
	return {type: APP.INITIALIZE, payload};
}

export function initializationAction() {
	return {type: APP.INITIALIZATION};
}

export function initializedAction() {
	return {type: APP.INITIALIZED};
}

