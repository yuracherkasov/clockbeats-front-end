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
	};

	sendHandler = event => {
		const enter = event.keyCode === 13;

		if (enter || event.type === 'click') {
			event.preventDefault();

			this.send();
		}
	};

	send = () => {
		const {message: value} = this.state;
		const {room, user, sendMessage} = this.props;
		const message = {
			room: room.id,
			issuer: user.id,
			body: value,
		};

		if (value) {
			sendMessage(message);
			this.setState(state => ({message: ''}));
		}
	};

	render() {
		const {loading, message} = this.state;
		const {room} = this.props;

		if (!room) {
			return <Redirect to={`/you/chat`} />
		}

		return (
			<div className="chat--room-window">

				{loading ? <Loader /> : <ChatWindow room={room} />}

				<div className="chat--room-window--messages--bar">

					<div className="chat--input-field">
						<textarea
							onKeyDown={this.sendHandler}
							onChange={event => this.setState({message: event.target.value})}
							className="form-control"
							placeholder="Write a message..."
							rows={1}
							value={message}
						/>
					</div>
					<div className="chat--send-button">
						<button type="button" className="btn btn-icon" onClick={this.sendHandler}>
							<span className="icon">
								<i className="fa fa-paper-plane fa-lg" />
							</span>
						</button>
					</div>

					<div className="chat--smiles-toggle">
						<button type="button" className="btn btn-icon">
							<span className="icon">
								<i className="fa fa-smile-o fa-2x" />
							</span>
						</button>
					</div>
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