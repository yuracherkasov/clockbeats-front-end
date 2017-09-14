import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Route, withRouter} from 'react-router-dom';

import Room from './components/Room';
import Contacts from './components/Contacts';

function SelectChatNotice() {
	return (
		<div className="chat--no-room">
			<p className="chat--no-room__select-message">Please select a chat to start messaging</p>
		</div>
	);
}

class ChatContainer extends Component {
	constructor(props) {
		super(props);
	}

	render() {
		const {match} = this.props;

		return (
			<div className="chat">

				<div className="chat--content">
					<div className="chat--content--main">
						<Route exact path={`${match.path}`} render={SelectChatNotice}/>
						<Route path={`${match.path}/:room`} component={Room} />
					</div>

					<div className="chat--content--aside">
						<Route path={`${match.path}`} component={Contacts} />
					</div>
				</div>
			</div>
		);
	}
}

export default withRouter(ChatContainer);