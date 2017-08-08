import React, {Component} from 'react';
import {NavLink} from 'react-router-dom';

class DrawerContainer extends Component {
	constructor(props) {
		super(props);
	}

	render() {

		return (
			<aside className="drawer panel">
				<div className="drawer-wrapper">
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

export default DrawerContainer;