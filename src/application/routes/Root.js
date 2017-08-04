import React, {Component} from 'react';
import {connect} from 'react-redux';
import {withRouter, Link} from 'react-router-dom';

import Routing from '../routes';
import Header from '../components/Header';

class RootContainer extends Component {
	constructor(props) {
		super(props);
	}

	render() {
		const {location} = this.props;
		const sign = !!location.pathname.match('sign');

		return (
			<div className={sign && 'with-background'}>
				<Header />
				<main className="main-content">
					<div className="container">
						<div className="row">
							<div className="col">
								<Routing />
							</div>
						</div>
					</div>
				</main>

				<footer className="text-center">
					Clockbeats IVS ® 2017 All Rights Reserved | Reg. no. DK 36965339. | <Link to="/terms">Terms of Use</Link>
				</footer>
			</div>
		);
	}
}

export default withRouter(RootContainer);