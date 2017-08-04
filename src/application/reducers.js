import {combineReducers} from 'redux';

import user from './services/Auth/aids/reducer';

export default combineReducers({
	user,
});