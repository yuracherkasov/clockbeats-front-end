import React, {Component} from 'react';
import {connect} from 'react-redux';
import {NavLink, withRouter} from 'react-router-dom';

import {LargeMacroProfile} from '../../Macro-profiles';

class DrawerContainer extends Component {
	constructor(props) {
		super(props);
	}

	render() {
		const {online, user} = this.props;

		return (
			<aside className="drawer panel">
				<div className="drawer-wrapper">
					<LargeMacroProfile online={online} user={user} />
					<nav>
						<ul>
							<li>
								<NavLink to="/you" exact>
									<i className="fa fa-tachometer fa-fw"/>
									Dashboard
								</NavLink>
							</li>
							<li>
								<NavLink to="/you/profile">
									<i className="fa fa-user fa-fw"/>
									Profile
								</NavLink>
							</li>
							<li>
								<NavLink to="/you/contacts">
									<i className="fa fa-users fa-fw"/>
									Contacts
								</NavLink>
							</li>
							<li>
								<NavLink to="/you/explore">
									<i className="fa fa-compass fa-fw"/>
									Explore
								</NavLink>
							</li>
							<li>
								<NavLink to="/you/search">
									<i className="fa fa-search fa-fw"/>
									Search
								</NavLink>
							</li>
							<li>
								<NavLink to="/you/chat">
									<i className="fa fa-inbox fa-fw"/>
									Chat
								</NavLink>
							</li>
							<li>
								<NavLink to="/you/cloudbeats">
									<i className="fa fa-cloud-upload fa-fw"/>
									Cloudbeats
								</NavLink>
							</li>
							<li>
								<NavLink to="/you/workspace">
									<i className="fa fa-briefcase fa-fw"/>
									Workspace
								</NavLink>
							</li>
							<li>
								<NavLink to="/you/settings">
									<i className="fa fa-cog fa-fw"/>
									Settings
								</NavLink>
							</li>
						</ul>
					</nav>
				</div>
			</aside>
		);
	}
}

export default withRouter(connect(
	state => ({user: state.user, online: state.socket.online}),
)(DrawerContainer));