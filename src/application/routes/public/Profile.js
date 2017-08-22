import React, {Component} from 'react';
import {Link} from 'react-router-dom';

class ProfileScene extends Component {
	constructor(props) {
		super(props);
	}

	render() {
		const {match} = this.props;
		const {profile} = match.params;

		return (
			<div className="container">
				<div className="row">
					<div className="col">
						<div className="pt-5 text-center">Hi, <b>{profile}</b>. Here should be your public profile</div>
					</div>
				</div>
			</div>
		);
	}

}

export default ProfileScene;