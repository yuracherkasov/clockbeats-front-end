import React, {Component} from 'react';
import {connect} from 'react-redux';
import {
	Route,
	Redirect,
	withRouter,
} from 'react-router-dom';

import Profile from './Profile';

class YouScene extends Component {
	constructor(props) {
		super(props);
	}

	render() {
		const {user, match} = this.props;

		if (!user.username) {
			return <Redirect to="/sign-in" />
		}

		return (
			<div>
				<div>"You" Scene Component</div>

				<Route path={`${match.path}/profile`} component={Profile} />
			</div>
		);
	}

}

const mapStateToProps = state => ({
	user: state.user,
});

export default withRouter(connect(
	mapStateToProps,
)(YouScene));