import React from 'react';
import {Provider, connect} from 'react-redux';
import {BrowserRouter} from 'react-router-dom';

import createStore from './store';

import Root from './routes/Root';

export default function BootstrapContainer({}) {
	const store = createStore({});

	return (
		<Provider store={store}>
			<BrowserRouter>
				<Root />
			</BrowserRouter>
		</Provider>
	);
}