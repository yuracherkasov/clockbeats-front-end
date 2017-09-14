import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import PropTypes from 'prop-types';

import Input from '../../../../components/Input';

export default class SignInForm extends Component {
	static propTypes = {
		onSubmit: PropTypes.func.isRequired,
	};

	constructor(props) {
		super(props);
	}

	state = {
		email: {
			value: '',
			valid: false,
		},
		password: {
			value: '',
			valid: false,
		},
		canSubmit: false,
	};

	componentWillUpdate(nextProps, nextState) {
		const {canSubmit: prevCanSubmit} = this.state;
		const {email, password} = nextState;
		const canSubmit = (email.valid && password.valid);

		if (canSubmit !== prevCanSubmit) {
			this.setState({
				email,
				password,
				canSubmit,
			});
		}
	}

	inputHandler = ({value, valid, name}) => {
		this.setState({[name]: {value, valid}});
	};

	submitHandler = event => {
		event.preventDefault();

		const {canSubmit, email, password} = this.state;
		const {onSubmit} = this.props;

		if (canSubmit) {
			onSubmit({
				email: email.value,
				password: password.value,
			});
		}
	};

	render() {
		const {email, password, canSubmit} = this.state;

		return (
			<div className="sign-form">
				<h3 className="title">Sign In</h3>
				<form className="form">
					<Input
						type="email"
						name="email"
						value={email.value}
						required
						placeholder="Email"
						rootClasses="form-group mr-0"
						inputClasses="form-control"
						handler={this.inputHandler}
					/>
					<Input
						type="password"
						name="password"
						value={password.value}
						required
						placeholder="Password"
						rootClasses="form-group mr-0"
						inputClasses="form-control"
						handler={this.inputHandler}
					/>

					<div className="">
						<button
							type="submit"
							className="btn btn-default btn-block"
							onClick={this.submitHandler}
							disabled={!canSubmit}
						>
							Sign In
						</button>

						<Link to="/restore">Forgot password?</Link>

						<div className="has-text-centered">
							By signing in, you agree to our <b><Link to="/terms" className="text-muted">Terms</Link></b> & <b><Link to="/terms" className="text-muted">Privacy Policy</Link></b>.
						</div>
					</div>
				</form>
			</div>
		);
	}
}