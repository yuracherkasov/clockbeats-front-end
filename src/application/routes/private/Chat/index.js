import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Route, withRouter} from 'react-router-dom';

import Room from './components/Room';
import Contacts from './components/Contacts';

class ChatContainer extends Component {
	constructor(props) {
		super(props);
	}

	render() {
		const {match} = this.props;

		return (
			<div className="chat panel">
				<div style={{backgroundColor: 'white'}}>
					<div className="container-fluid">
						<div className="row">
							<div className="col-md-3 p-0">
								<div className="chat-contacts">
									<div className="chat-contacts-wrapper">
										<Route path={`${match.path}`} component={Contacts} />
									</div>
								</div>
							</div>

							<div className="col-md-9 p-0">
								<Route path={`${match.path}/:room`} component={Room} />
							</div>
						</div>
					</div>
				</div>
			</div>
		);
	}
}

export default withRouter(connect(null, null)(ChatContainer));