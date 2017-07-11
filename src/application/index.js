import React from 'react';
import ReactDOM from 'react-dom';
import {AppContainer} from 'react-hot-loader';

import 'assets/sass/style.scss';
import Bootstrap from './bootstrap';

const render = Component =>
	ReactDOM.render(
		<AppContainer>
			<Component />
		</AppContainer>,
		document.getElementById('root')
	);

render(Bootstrap);

if (module.hot) {
	module.hot.accept('./bootstrap', () => render(Bootstrap));
}
