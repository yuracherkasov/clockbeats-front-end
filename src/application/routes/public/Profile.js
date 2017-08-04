import React, {Component} from 'react';
import {Link} from 'react-router-dom';

class ProfileScene extends Component {
	constructor(props) {
		super(props);
	}

	render() {
		const {match} = this.props;
		const {profile} = match.params;

		if (profile && profile !== 'paolomantini') {
			return (
				<div>
					Sorry, but user <b>{profile}</b> not found. <Link to='/sign-in'>Sign In. ASAP!</Link>
				</div>
			);
		}

		return (
			<div>Hi, <b>{profile}</b>. Here should be your public profile</div>
		);
	}

}

export default ProfileScene;