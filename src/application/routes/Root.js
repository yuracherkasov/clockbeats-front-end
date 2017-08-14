import React, {Component} from 'react';
import {Link} from 'react-router-dom';

import Routing from '../routes';
import Header from '../components/Header';

class RootContainer extends Component {
	constructor(props) {
		super(props);
	}

	render() {

		return (
			<div>
				<Header />
				<section className="main-content">
					<Routing />
				</section>

				<footer className="text-center">
					Clockbeats IVS ® 2017 All Rights Reserved | Reg. no. DK 36965339. | <Link to="/terms">Terms of Use</Link>
				</footer>
			</div>
		);
	}
}

export default RootContainer;