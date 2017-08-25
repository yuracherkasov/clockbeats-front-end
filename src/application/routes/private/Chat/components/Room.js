import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Redirect} from 'react-router-dom';

import Loader from '../../../../components/Loading';
import ChatWindow from './Chat-window';

import {createSelector} from 'reselect';
import {roomsSelector} from '../selectors';
import head from 'lodash/head';

import {chatSendMessageRequestAction} from '../../../../services/Chat/aids/actions';

class ChatWindowContainer extends Component {
	constructor(props) {
		super(props);
	}

	state = {
		loading: false,
		message: '',

		messages: [],
	};

	sendHandler = event => {
		const enter = event.keyCode === 13;

		if (enter) {
			event.preventDefault();
			const message = event.target.value;
			this.send(message);
		}
	};

	send = body => {
		const {room, user, sendMessage} = this.props;
		const message = {
			room: room.id,
			issuer: user.id,
			body,
		};

		sendMessage(message);

		this.setState(state => ({message: ''}));
	};

	render() {
		const {loading, message} = this.state;
		const {room} = this.props;

		if (!room) {
			return <Redirect to={`/you/chat`} />
		}

		return (
			<div className="chat-room">

				{loading ? <Loader /> : <ChatWindow room={room} />}

				<div className="chat-typo">
					<div className="form-group">
						<textarea
							onKeyDown={this.sendHandler}
							onChange={event => this.setState({message: event.target.value})}
							className="form-control form-control-lg"
							placeholder="Wright your message..."
							rows={1}
							value={message}
						/>
					</div>
					<span className="d-inline-block">
						<i className="fa fa-smile-o fa-fw fa-3x text-muted" />
					</span>
				</div>
			</div>
		);
	}
}

const selectRoom = createSelector(
	(state, props) => props.match.params.room,
	roomsSelector,
	(roomId, rooms) => head(rooms.filter(room => room.id === roomId)),
);

const mapStateToProps = (state, props) => ({
	user: state.user,
	room: selectRoom(state, props),
});

const mapDispatchToProps = dispatch => ({
	sendMessage: ({room, issuer, body}) => dispatch(chatSendMessageRequestAction({room, issuer, body})),

	// editMessage: (roomId, messageId, message) => dispatch(() => {}),
	// removeMessage: (roomId, messageId) => dispatch(() => {}),
});

export default connect(
	mapStateToProps,
	mapDispatchToProps,
)(ChatWindowContainer);