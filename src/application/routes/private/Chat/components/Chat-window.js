import React, {Component} from 'react';
import {connect} from 'react-redux';

import Message from './Message';

import {createSelector} from 'reselect';

import {onlineSelector} from '../selectors';
import memoize from 'lodash/memoize';
import head from 'lodash/head';

class ChatWindowContainer extends Component {
	constructor(props) {
		super(props);
		this.getMessage = memoize(message => this.renderMessage(message));
	}



	componentDidUpdate() {
		this.wrapper.scrollTop = this.wrapper.scrollHeight;
	}

	componentDidMount() {
		this.wrapper.scrollTop = this.wrapper.scrollHeight;
	}

	selected(message) {
		console.log(message);
	}

	renderMessage(message) {
		return (
			<Message
				key={message.id}
				selection={this.selected}
				message={message}
			/>
		);
	}

	render() {
		const {messages} = this.props;

		return (
			<div className="chat-messages">
				<div className="chat-messages-wrapper" ref={wrapper => this.wrapper = wrapper}>
					{messages.map(message =>
						this.getMessage(message))}
				</div>
			</div>
		);
	}
}

const selectIssuer = createSelector(
	state => state.user.id,
	onlineSelector,
	(state, props) => props.room.messages,
	(self, users, messages) => {
		return messages.map(message => {
			const issuer = head(users.filter(user => user.id === message.issuer));

			return {
				...message,
				issuer,
				own: issuer.id === self,
			};
		});
	}
);

const mapStateToProps = (state, props) => ({
	messages: selectIssuer(state, props),
});

export default connect(
	mapStateToProps,
	null,
)(ChatWindowContainer);