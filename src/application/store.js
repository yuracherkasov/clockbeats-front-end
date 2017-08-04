import {
	createStore,
	applyMiddleware
} from 'redux';
import createSagaMiddleware from 'redux-saga';

import sagas from './sagas';
import reducers from './reducers';

/**
 * Logs all actions and states after they are dispatched.
 */
const logger = store => next => action => {

	const style = (() => {
		if (action.type.match('FAILED')) {
			return 'color: #F4511E; font-weight: bold;';
		} else if (action.type.match('SUCCEEDED')) {
			return 'color: #43A047; font-weight: bold;';
		} else {
			return 'color: #00ACC1; font-weight: bold;';
		}
	})();

	console.group(`%c${action.type}`, style);
	console.info('dispatching', action);
	const result = next(action);
	console.log('next state', store.getState());
	console.groupEnd(action.type);
	return result;
};


export default initialState => {
	const sagaMiddleware = createSagaMiddleware();

	const store = createStore(
		reducers,
		initialState,
		applyMiddleware(sagaMiddleware, logger),
	);

	sagaMiddleware.run(sagas);

	return store;
};