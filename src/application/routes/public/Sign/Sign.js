import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Redirect} from 'react-router-dom';

import Join from './components/Join';
import SignInForm from './components/SignInForm';
import SignUpForm from './components/SignUpForm';

import {
	signInRequestAction,
	signUpRequestAction,
} from '../../../services/Auth/aids/actions';

class SignScene extends Component {
	constructor(props) {
		super(props);
	}

	signIn = ({email, password}) => {
		const {signIn} = this.props;

		signIn(email, password);
	};

	signUp = ({email, password, username}) => {
		const {signUp} = this.props;

		signUp(email, password, username);
	};

	get form() {
		const {match} = this.props;

		switch (match.path) {
			case '/sign-in': {
				return <SignInForm onSubmit={this.signIn} />;
			}

			case '/sign-up': {
				if (match.params.invitation_token) {
					return <SignUpForm onSubmit={this.signUp} />;
				}

				return <Join />;
			}

			default: {
				return null;
			}
		}
	}

	render() {
		const {token, location} = this.props;
		const {from} = location.state || {from: {pathname: '/you'}};

		if (token) {
			return <Redirect to={from} />
		}

		return (
			<section className="sign-container">
				<div className="container">
					<div className="column is-half-desktop is-offset-one-quarter-desktop">
						{this.form}
					</div>
				</div>
			</section>
		);
	}

}

const mapStateToProps = state => ({
	token: state.auth.token,
});

const mapDispatchToProps = dispatch => ({
	signIn: (email, password) => dispatch(signInRequestAction({email, password})),
	signUp: (email, password, username) => dispatch(signUpRequestAction({email, password, username})),
});

export default connect(
	mapStateToProps,
	mapDispatchToProps,
)(SignScene);