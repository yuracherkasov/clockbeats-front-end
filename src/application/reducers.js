import {combineReducers} from 'redux';

import user from './services/Auth/aids/reducer';
import socket from './services/Socket/aids/connection/reducer';

export default combineReducers({
	user,
	socket,
});