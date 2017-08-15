import React, {Component} from 'react';
import {connect} from 'react-redux';
import {
	NavLink,
	Link,
	Route,
	Switch,
	Redirect,
	withRouter,
} from 'react-router-dom';

import Room from './components/Room';
import Contacts from './components/Contacts';

class ChatContainer extends Component {
	constructor(props) {
		super(props);
	}

	// TODO: create tabs component
	render() {
		const {match} = this.props;

		return (
			<div className="chat panel">
				<div className="container">
					<div className="chat-wrapper">

						<div className="tabs panel">
							<ul className="d-flex justify-content-start align-items-center">
								<li className="tab-item">
									<NavLink to={`${match.path}/johnsnow`}>John Snow</NavLink>
								</li>
								<li className="tab-item">
									<NavLink to={`${match.path}/serhiiyaitsky`}>Serhii Yaitsky</NavLink>
								</li>
								<li className="ml-auto tab-item">
									<NavLink exact to={`${match.path}`}>Contacts</NavLink>
								</li>
							</ul>
						</div>

						<div className="chat-window">
							<Switch>
								<Route exact path={`${match.path}`} component={Contacts} />
								<Route path={`${match.path}/:room`} component={Room} />
							</Switch>
						</div>
					</div>
				</div>
			</div>
		);
	}
}

export default withRouter(connect(
	null,
	null,
)(ChatContainer));