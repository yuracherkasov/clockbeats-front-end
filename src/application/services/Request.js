import Storage from './Storage';

class Requests {
	constructor(host) {
		this.host = host;
	}

	get headers () {
		const token = Storage.token;
		const headers = {
			'Accept': 'application/json',
			'Content-Type': 'application/json',
		};

		if (token) {
			return {
				...headers,
				'Authorization': `Bearer ${token.token}`,
			};
		}

		return headers;
	};

	static _call() {
		return fetch(...arguments)
			.then(response => response.json());
	}

	options(params = {}) {
		return {
			mode: 'cors',
			cache: 'default',
			headers: this.headers,
			...params
		}
	}

	get(url = '') {
		const options = this.options({method: 'GET'});

		return Requests._call(`${this.host}/${url}`, options);
	}

	post(url = '', data) {
		const options = this.options({method: 'POST', body: JSON.stringify(data)});

		return Requests._call(`${this.host}/${url}`, options);
	}

	patch(url = '', data) {
		const options = this.options({method: 'PATCH', body: JSON.stringify(data)});

		return Requests._call(`${this.host}/${url}`, options);
	}

	'delete'(url = '') {
		const options = this.options({method: 'DELETE'});

		return Requests._call(`${this.host}/${url}`, options);
	}

}

const HOST = process.env.NODE_ENV === 'production' ? 'https://api.clockbeats.com' : 'http://127.0.0.1:8090';

export default new Requests(HOST);