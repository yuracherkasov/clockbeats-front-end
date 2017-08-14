import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import {BrowserRouter} from 'react-router-dom';
import registerServiceWorker from './register-service-worker';

import 'assets/sass/style.scss';
import Root from './routes/Root';
import createStore from './store';

const store = createStore({});

const render = Component =>
	ReactDOM.render(
		<Provider store={store}>
			<BrowserRouter>
				<Component />
			</BrowserRouter>
		</Provider>,
		document.getElementById('root')
	);

if (module.hot) {
	module.hot.accept('./routes/Root', () => render(Root));
}

registerServiceWorker();
render(Root);