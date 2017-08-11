import React from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {
	Link,
	NavLink,
	withRouter
} from 'react-router-dom';

import {signOutRequestAction} from '../../services/Auth/aids/actions';

function links(user, signOut) {
	if (!user.username) {
		return [
			<Link key={1} to="/sign-in" className="btn btn-secondary mr-3">Sign In</Link>,
			<Link key={0} to="/sign-up" className="btn btn-primary">Sign up</Link>,
		];
	}

	return (
		<div>
			<Link to="/you/profile">Hello, {user.username}</Link>
			<div className="btn btn-primary ml-3" onClick={() => signOut()}>Sign Out</div>
		</div>
	);
}

function Header({user, online, signOut}) {
	return (
		<header className="page-header">
			<nav className="navigation navigation-head">
				<div className="container-fluid">
					<div className="row">
							<div className="col-md-4 d-flex align-items-center">
								<div className="ml-5">
									<NavLink to="/" exact className="item" activeClassName="active">Home</NavLink>
									<NavLink to="/intro" className="item" activeClassName="active">Get Started</NavLink>
									<a href="https://store.clockbeats.com/" className="item">Store</a>
								</div>
							</div>
							<div className="col-md-4 d-flex align-items-center justify-content-center">
								<Link to="/" className="text-uppercase">
									<figure className="logo">
										<img src="https://clockbeats.com/static/img/cb_logo.png" alt="Clockbeats Logo" />
									</figure>
								</Link>
							</div>
							<div className="col-md-4 d-flex align-items-center justify-content-end">
								<div className="mr-5">
									{links(user, signOut)}
								</div>
							</div>
					</div>
				</div>
			</nav>
		</header>
	);
}

Header.propTypes = {
	user: PropTypes.object.isRequired,
	online: PropTypes.bool.isRequired,
};

export default withRouter(connect(
	state => ({user: state.user, online: state.socket.online}),
	dispatch => ({signOut: () => dispatch(signOutRequestAction())}),
)(Header));