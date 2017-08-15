import React, {Component} from 'react';
import ChatWindow from './Chat-window';

export default class ChatWindowContainer extends Component {
	constructor(props) {
		super(props);
	}

	render() {

		return (
			<div className="chat-room">
				<ChatWindow messages={[]} />
				<div className="chat-typo">
					<div className="form-group">
						<textarea className="form-control form-control-lg" placeholder="Wright your message..." rows={1} />
					</div>
					<span className="d-inline-block">
						<i className="fa fa-smile-o fa-fw fa-3x text-muted" />
					</span>
				</div>
			</div>
		);
	}
}