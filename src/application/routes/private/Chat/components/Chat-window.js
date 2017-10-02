import React, {Component} from 'react';
import {connect} from 'react-redux';

import Message from './Message';

import {createSelector} from 'reselect';

import {onlineSelector} from '../selectors';

import {
	head,
	uniqBy,
	memoize,
	property,
} from 'lodash';

class ChatWindowContainer extends Component {
	constructor(props) {
		super(props);
		this.getMessage = memoize(message => this.renderMessage(message));
	}

	state = {
		selected: [],
	};

	componentDidUpdate() {
		this.wrapper.scrollTop = this.wrapper.scrollHeight;
	}

	componentDidMount() {
		this.wrapper.scrollTop = this.wrapper.scrollHeight;
	}

	selected = (message) => {
		// this.setState(state => {
		// 	const exist = state.selected.find(item => item.id === message.id);
		//
		// 	if (!exist) {
		// 		return {
		// 			selected: [...state.selected, message],
		// 		}
		// 	} else {
		// 		return {
		// 			selected: state.selected.filter(item => item.id !== message.id),
		// 		}
		// 	}
		// });
	};

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
			<ul className="chat--room-window--messages--list" ref={wrapper => this.wrapper = wrapper}>
				{messages.map(message =>
					this.getMessage(message))}
			</ul>
		);
	}
}

const selectIssuer = createSelector(
	state => state.user.id,
	state => state.users,
	(state, props) => props.room.messages,
	(self, users, messages) => {
		if (messages.length === 0) return messages;

		if (messages.length === 1) {
			const [message] = messages;
			const [issuer] = users.filter(user => user.id === message.issuer);

			return [{
				...message,
				issuer,
				own: issuer.id === self,
				repeated: false,
			}];
		}

		const issuers = uniqBy(messages, property('issuer')).map(message => {
			const [issuer] = users.filter(user => user.id === message.issuer);
			return issuer;
		});

		return messages.map((message, index) => {
			const [issuer] = issuers.filter(issuer => issuer.id === message.issuer);
			const next = messages[index + 1];

			return {
				...message,
				issuer,
				own: issuer.id === self,
				repeated: (next && next.issuer === message.issuer),
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