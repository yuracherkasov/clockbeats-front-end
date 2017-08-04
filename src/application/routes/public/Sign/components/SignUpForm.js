import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import PropTypes from 'prop-types';

import Input from '../../../../components/Input';

export default class SignUpForm extends Component {
	static propTypes = {
		onSubmit: PropTypes.func.isRequired,
	};

	constructor(props) {
		super(props);
	}

	render() {

		return (
			<div className="sign-form">
				<h3>Sign Up</h3>
				<form>
					<div className="form-group">
						<Input
							type="text"
							placeholder="Username"
							inputClasses="form-control"
							required
							handler={console.log}
						/>
					</div>
					<div className="form-group">
						<Input
							type="email"
							placeholder="Email"
							inputClasses="form-control"
							required
							handler={console.log}
						/>
					</div>
					<div className="form-group">
						<Input
							type="password"
							inputClasses="form-control"
							placeholder="Password"
							handler={console.log}
						/>
					</div>

					<div className="form-group">
						<button type="submit" className="btn btn-primary btn-block">Sign Up</button>
						<div className="text-center text-muted mt-3">
							By signing up, you agree to our <b><Link to="/terms" className="text-muted">Terms</Link></b> & <b><Link to="/terms" className="text-muted">Privacy Policy</Link></b>.
						</div>
					</div>
				</form>
			</div>
		);
	}
}