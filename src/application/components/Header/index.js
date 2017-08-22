import React from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {
	Link,
	NavLink,
	withRouter
} from 'react-router-dom';

import {createSelector} from 'reselect';

import {signOutRequestAction} from '../../services/Auth/aids/actions';

function Header({user, signOut, commonNotifications}) {
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
						<div className="col-md-4 align-items-center">
							{user.username && (
								<div className="p-2 h-100 d-flex align-items-center justify-content-end mr-5">
									<div className="mr-3" style={{cursor: 'pointer'}}>
										<Link className="text-muted" to="/you/explore">
											<i className="fa fa-compass fa-fw fa-lg" aria-hidden="true" />
										</Link>
									</div>
									<div className="mr-3" style={{cursor: 'pointer'}}>
										<Link className="text-muted" to="/you/chat">
											<i className="fa fa-inbox fa-fw fa-lg" aria-hidden="true" />
										</Link>
									</div>
									<div className="mr-3" style={{cursor: 'pointer'}}>
										<Link className="text-muted" to="/you/workspace">
											<i className="fa fa-briefcase fa-fw fa-lg" aria-hidden="true" />
										</Link>
									</div>
									<div className="mr-3 text-muted" style={{cursor: 'pointer'}}>
										<i className="fa fa-bell fa-fw fa-lg" aria-hidden="true" />
										<span>{commonNotifications}</span>
									</div>

									<div className="ml-3 mr-3 text-muted" style={{cursor: 'pointer'}} onClick={() => signOut()}>
										Sign Out <i className="fa fa-sign-out fa-fw fa-lg" aria-hidden="true" />
									</div>
								</div>
							)}

							{!user.username && (
								<div className="d-flex align-items-center justify-content-end mr-5">
									<Link to="/sign-in" className="btn btn-secondary mr-3">Sign In</Link>
									<Link to="/sign-up" className="btn btn-primary">Sign up</Link>
								</div>
							)}
						</div>
					</div>
				</div>
			</nav>
		</header>
	);
}

Header.propTypes = {
	user: PropTypes.object.isRequired,
};

const commonNotifications = createSelector(
	state => state.notifications,
	(notifications) => {
		const count = notifications
			.filter(notification => notification.type === 'common')
			.filter(notification => !notification.pristine)
			.length;

		return count;
	}
);

export default withRouter(connect(
	state => ({
		user: state.user,
		online: state.socket.online,
		commonNotifications: commonNotifications(state),
	}),
	dispatch => ({signOut: () => dispatch(signOutRequestAction())}),
)(Header));
