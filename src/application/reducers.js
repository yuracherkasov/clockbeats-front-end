import {combineReducers} from 'redux';

import app from './services/Application/aids/reducer';
import auth from './services/Auth/aids/reducer';
import user from './services/Self/aids/reducer';
import users from './services/Users/aids/reducer';
import socket from './services/Socket/aids/connection/reducer';
import browser from './services/Browser/Media/aids/reducer';

import online from './services/Socket/aids/user/reducer';

export default combineReducers({
	app,
	auth,
	user,
	users,
	socket,
	browser,
	online,
});