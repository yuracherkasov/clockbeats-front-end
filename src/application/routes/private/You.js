import React, {Component} from 'react';
import {connect} from 'react-redux';
import {
	Route,
	Redirect,
	withRouter,
} from 'react-router-dom';

import Chat from './Chat';
import Contacts from './Contacts';
import Profile from './Profile';
import Search from './Search';
import {Drawer} from '../../components/Navigation';
import Loading from '../../components/Loading';

class YouScene extends Component {
	constructor(props) {
		super(props);
	}

	render() {
		const {app, token, match, location} = this.props;

		if (app.initialization) {
			return <Loading />;
		}

		if (!token) {
			const redirect = {
				pathname: '/sign-in',
				state: {from: location}
			};

			return <Redirect to={redirect} />
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
									<Route path={`${match.path}/contacts`} component={Contacts} />
									<Route path={`${match.path}/explore`} component={Profile} />
									<Route path={`${match.path}/search`} component={Search} />
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
	token: state.auth.token,
});

export default withRouter(connect(
	mapStateToProps,
)(YouScene));