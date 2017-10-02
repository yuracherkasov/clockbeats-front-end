import React, {Component} from 'react';
import {connect} from 'react-redux';
import {
	Route,
	NavLink,
	Redirect,
	withRouter,
} from 'react-router-dom';

import Chat from './Chat';
import Contacts from './Contacts';
import Profile from './Profile';
import Search from './Search';
import Settings from './Settings';
import Workspace from './Workspace';
import Drawer from '../../components/Drawer';
import Loading from '../../components/Loading';
import Anchor from '../../components/Anchor';

import {ProfileCardLarge} from '../../components/Profile-card';

class YouScene extends Component {
	constructor(props) {
		super(props);
	}

	render() {
		const {app, token, match, location, user, online} = this.props;

		if (app.initialization) {
			return <Loading />;
		}

		if (!token) {
			const redirect = {
				pathname: '/sign-in',
				state: {from: location}
			};

			return <Redirect to={redirect} />;
		}

		return (
			<div>
				<Drawer>
					<ProfileCardLarge user={{...user, online}} />
					<nav className="drawer-navigation">
						<ul className="drawer-navigation--list">
							<li>
								<NavLink to="/you" exact className="drawer-navigation--link">
									<i className="fa fa-tachometer fa-fw"/>
									Dashboard
								</NavLink>
							</li>
							<li>
								<NavLink to="/you/profile" className="drawer-navigation--link">
									<i className="fa fa-user fa-fw"/>
									Profile
								</NavLink>
							</li>
							<li>
								<NavLink to="/you/contacts" className="drawer-navigation--link">
									<i className="fa fa-users fa-fw"/>
									Contacts
								</NavLink>
							</li>
							<li>
								<NavLink to="/you/explore" className="drawer-navigation--link">
									<i className="fa fa-compass fa-fw"/>
									Explore
								</NavLink>
							</li>
							<li>
								<NavLink to="/you/search" className="drawer-navigation--link">
									<i className="fa fa-search fa-fw"/>
									Search
								</NavLink>
							</li>
							<li>
								<NavLink to="/you/chat" className="drawer-navigation--link">
									<i className="fa fa-inbox fa-fw"/>
									Chat
								</NavLink>
							</li>
							<li>
								<NavLink to="/you/cloudbeats" className="drawer-navigation--link">
									<i className="fa fa-cloud-upload fa-fw"/>
									Cloudbeats
								</NavLink>
							</li>
							<li>
								<NavLink to="/you/workspace" className="drawer-navigation--link">
									<i className="fa fa-briefcase fa-fw"/>
									Workspace
								</NavLink>
							</li>
							<li>
								<NavLink to="/you/settings" className="drawer-navigation--link">
									<i className="fa fa-cog fa-fw"/>
									Settings
								</NavLink>
							</li>
						</ul>
					</nav>
				</Drawer>

				<div className="content">
					<div className="content--wrapper">
						<main className="scenes">
							<Route exact path={`${match.path}`} component={Profile} />
							<Route path={`${match.path}/profile`} component={Profile} />
							<Route path={`${match.path}/contacts`} component={Contacts} />
							<Route path={`${match.path}/explore`} component={Profile} />
							<Route path={`${match.path}/search`} component={Search} />
							<Route path={`${match.path}/chat`} component={Chat} />
							<Route path={`${match.path}/cloudbeats`} component={Profile} />
							<Route path={`${match.path}/workspace`} component={Workspace} />
							<Route path={`${match.path}/settings`} component={Settings} />
						</main>
					</div>
				</div>
			</div>
		);
	}

}

const mapStateToProps = state => ({
	app: state.app,
	user: state.user,
	token: state.auth.token,
	online: state.socket.online,
});

export default withRouter(connect(
	mapStateToProps,
)(YouScene));