import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Redirect} from 'react-router-dom';

import Loader from '../../../../components/Loading';
import ChatWindow from './Chat-window';

import {createSelector} from 'reselect';
import {roomsSelector} from '../selectors';
import head from 'lodash/head';

class ChatWindowContainer extends Component {
	constructor(props) {
		super(props);
	}

	state = {
		loading: false,
	};

	render() {
		const {loading} = this.state;
		const {room} = this.props;

		if (!room) {
			return <Redirect to={`/you/chat`} />
		}

		return (
			<div className="chat-room">

				{loading ? <Loader /> : <ChatWindow messages={room.messages} />}

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

const selectRoom = createSelector(
	(state, props) => props.match.params.room,
	roomsSelector,
	(roomId, rooms) => head(rooms.filter(room => room.id === roomId)),
);

const mapStateToProps = (state, props) => ({
	room: selectRoom(state, props),
});

export default connect(
	mapStateToProps,
	null,
)(ChatWindowContainer);