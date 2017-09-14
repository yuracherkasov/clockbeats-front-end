import React from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {
	Link,
	NavLink,
	withRouter,
} from 'react-router-dom';

import {createSelector} from 'reselect';

import {signOutRequestAction} from '../../services/Auth/aids/actions';


export function Header({user, signOut, commonNotifications, chatNotifications, workspaceNotifications}) {
	return (
		<header className="main-header">
			<div className="main-header--wrapper">

				<div className="main-header--public-menu">
					<NavLink
						to="/"
						exact
						className="main-header--public-menu--link"
						activeClassName="is-active">Home</NavLink>
					<NavLink
						to="/intro"
						className="main-header--public-menu--link"
						activeClassName="is-active">Get Started</NavLink>
					<a href="https://store.clockbeats.com/" className="main-header--public-menu--link">Store</a>
				</div>

				<div className="main-header--logo">
					<Link to="/">
						<img src="https://clockbeats.com/static/img/cb_logo.png" alt="Clockbeats Logo" />
					</Link>
				</div>

				{user.username && <Toolbar user={user} chat={chatNotifications} workspace={workspaceNotifications} common={commonNotifications} signOut={signOut}/>}

				{!user.username && (
					<div className="main-header--toolbar">
						<Link to="/sign-in" className="btn btn-default mr-2">
							<span>Sign In</span>
							<span className="icon ml-1">
									<i className="fa fa-sign-out" aria-hidden="true" />
								</span>
						</Link>

						<Link to="/sign-up" className="btn btn-primary">
							<span>Sign up</span>
							<span className="icon ml-1">
									<i className="fa fa-sign-out" aria-hidden="true" />
								</span>
						</Link>
					</div>
				)}

			</div>
		</header>
	);
}




function Toolbar({user, chat, workspace, common, signOut}) {
	return (
		<ul className="main-header--toolbar">

			{/* Explore */}
			<li className="main-header--toolbar--icon">
				<Link to="/you/explore" className="btn btn-icon" title={`Explore new things!`}>
					<span className="icon">
						<i className="fa fa-compass fa-lg" aria-hidden="true" />
					</span>
				</Link>
			</li>

			{/* Chat */}
			<li className="main-header--toolbar--icon">
				<Link to="/you/chat" className="btn btn-icon" title={`${chat} New messages`}>
					<span className="icon">
						<i className="fa fa-inbox fa-lg" aria-hidden="true" />
					</span>

					<span className="tag rounded">{chat}</span>
				</Link>
			</li>

			{/* Workspace */}
			<li className="main-header--toolbar--icon">
				<Link to="/you/workspace" className="btn btn-icon" title={`${workspace} New updates`}>
					<span className="icon">
						<i className="fa fa-briefcase fa-lg" aria-hidden="true" />
					</span>
					<span className="tag rounded">{workspace}</span>
				</Link>
			</li>

			{/* Notifications */}
			<li className="main-header--toolbar--icon">
				<div className="btn btn-icon" title={`${common} New notifications`}>
					<span className="icon">
						<i className="fa fa-bell fa-lg" aria-hidden="true" />
					</span>
					<span className="tag rounded">{common}</span>
				</div>
			</li>


			{/* User */}
			<UserMenu user={user} signOut={signOut}/>
		</ul>
	);
}
import {toggler} from '../Dropdown';

const UserMenu = toggler(({user, signOut, toggledOn, toggle}) => (
	<li className="main-header--toolbar--icon">
		<span style={{marginRight: 10}} >Hi, {user.username}!</span>
		<div className="btn btn-icon" title="User menu" onClick={toggle}>
			<div className="hamburger hamburger-dotted">
				<span />
				<span />
				<span />
			</div>
		</div>

		{toggledOn && (
			<div className="dropdown dropdown-menu">
				<div className="dropdown--content">
					<ul>
						<li>
							<Link to="/you/profile">{user.username}</Link>
						</li>
						<hr/>
						<li>
							<Link to="/you">Dashboard</Link>
						</li>
						<li>
							<Link to={`/${user.username}`}>Public Profile</Link>
						</li>
						<li>
							<Link to="/you/settings">Settings</Link>
						</li>
						<li>
							<Link to="/sign-in" onClick={() => signOut()}>
								<span>Sign Out</span>
								<span className="icon ml-2">
									<i className="fa fa-sign-out" aria-hidden="true" />
								</span>
							</Link>
						</li>
					</ul>
				</div>
			</div>
		)}
	</li>
));

Header.propTypes = {
	user: PropTypes.object.isRequired,
	signOut: PropTypes.func.isRequired,
	chatNotifications: PropTypes.number.isRequired,
	commonNotifications: PropTypes.number.isRequired,
	workspaceNotifications: PropTypes.number.isRequired,
};

Header.defaultProps = {
	signOut: () => {},
};

const commonNotifications = createSelector(
	state => state.notifications,
	(notifications) => {
		return notifications
			.filter(notification =>
				notification.type === 'common' && notification.pristine).length;
	}
);

const chatNotifications = createSelector(
	state => state.user.id,
	state => state.chats,
	(user, chats) =>
		chats.map(chat =>
			chat.messages.filter(message =>
				message.pristine && message.issuer !== user).length)
			.reduce((current, next) => current + next, 0)
);

const workspaceNotifications = createSelector(
	state => state.notifications,
	(notifications) => {
		return notifications
			.filter(notification =>
				notification.type === 'workspace' && notification.pristine).length;
	}
);

export default withRouter(connect(
	state => ({
		user: state.user,
		online: state.socket.online,
		commonNotifications: commonNotifications(state),
		chatNotifications: chatNotifications(state),
		workspaceNotifications: workspaceNotifications(state),
	}),
	dispatch => ({signOut: () => dispatch(signOutRequestAction())}),
)(Header));
