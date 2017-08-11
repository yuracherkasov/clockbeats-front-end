import React, {Component} from 'react';
import {connect} from 'react-redux';
import {
	Route,
	Redirect,
	withRouter,
} from 'react-router-dom';

import Chat from './Chat';
import Profile from './Profile';
import {Drawer} from '../../components/Navigation';

class YouScene extends Component {
	constructor(props) {
		super(props);
	}

	render() {
		const {app, user, match, location} = this.props;

		if (app.initialization) {
			return <div id="page-loader" />
		}

		if (!user.token) {
			return <Redirect to={{
				pathname: '/sign-in',
				state: {from: location},
			}} />
		}

		return (
			<div className="h-100">
				<Drawer />

				<div className="content">
					<div className="content-wrapper">
						<main className="container-fluid">
							<div className="row">
								<div className="col">
									<Route exact path={`${match.path}`} component={Profile} />
									<Route path={`${match.path}/profile`} component={Profile} />
									<Route path={`${match.path}/contacts`} component={Profile} />
									<Route path={`${match.path}/explore`} component={Profile} />
									<Route path={`${match.path}/search`} component={Profile} />
									<Route path={`${match.path}/chat`} component={Chat} />
									<Route path={`${match.path}/cloudbeats`} component={Profile} />
									<Route path={`${match.path}/workspace`} component={Profile} />
									<Route path={`${match.path}/settings`} component={Profile} />
								</div>
							</div>
						</main>
					</div>
				</div>
			</div>
		);
	}

}

const mapStateToProps = state => ({
	app: state.app,
	user: state.user,
});

export default withRouter(connect(
	mapStateToProps,
)(YouScene));