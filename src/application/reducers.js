import {combineReducers} from 'redux';

import app from './services/Application/aids/reducer';
import auth from './services/Auth/aids/reducer';
import user from './services/Self/aids/reducer';
import socket from './services/Socket/aids/connection/reducer';

export default combineReducers({
	app,
	auth,
	user,
	socket,
});