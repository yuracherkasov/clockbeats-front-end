import React, {Component} from 'react';
import {Link, withRouter} from 'react-router-dom';
import classNames from 'classnames';

import Routing from '../routes';
import Header from '../components/Header';
import Player from '../components/Player';
//
// import Loader from '../components/Loading';

class RootContainer extends Component {
	constructor(props) {
		super(props);
	}

	render() {
		const {location: {pathname}} = this.props;
		const [,you] = pathname.split('/');
		const rootClasses = classNames('clockbeats', {'public': you !== 'you'});

		return (
			<div className={rootClasses}>
				<Header />

				<section className="main-content">
					<Routing />
				</section>

				<section className="player">
					<Player />
				</section>

				{/*<footer className="footer">*/}
					{/*<div className="container">*/}
						{/*<div className="content has-text-centered">*/}
							{/*<p>*/}
								{/*<strong>Clockbeats IVS ®</strong> 2017 All Rights Reserved | Reg. no. DK 36965339. | <Link to="/terms">Terms of Use</Link>.*/}
							{/*</p>*/}
						{/*</div>*/}
					{/*</div>*/}
				{/*</footer>*/}
			</div>
		);
	}
}

export default withRouter(RootContainer);