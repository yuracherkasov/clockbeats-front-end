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
					<input type="text" placeholder="Write your message..." />
				</div>
			</div>
		);
	}
}