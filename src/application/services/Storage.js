const USER = 'user';
const TOKEN = 'token';

class Storage {
	constructor() {
		this._ls = window.localStorage;
	}

	set user(user) {
		if (Object.is(user, null)) {
			this._ls.removeItem(USER);
		} else {
			this._ls.setItem(USER, JSON.stringify(user));
		}
	}

	get user() {
		return JSON.parse(this._ls.getItem(USER));
	}

	set token(token) {
		if (Object.is(token, null)) {
			this._ls.removeItem(TOKEN);
		} else {
			this._ls.setItem(TOKEN, JSON.stringify(token));
		}
	}

	get token() {
		return JSON.parse(this._ls.getItem(TOKEN));
	}

}

export default new Storage();