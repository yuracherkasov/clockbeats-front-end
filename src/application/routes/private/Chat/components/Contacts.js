import React, {Component} from 'react';
import {NavLink} from 'react-router-dom';
import {connect} from 'react-redux';

import {roomsSelector, unreadSelector} from '../selectors';

import Avatar from '../../../../components/Avatar';

import {
	last,
	memoize,
} from 'lodash';

import moment from 'moment';

class ContactsContainer extends Component {
	constructor(props) {
		super(props);

		this.rooms = memoize(room => this.renderRoom(room));
	}

	renderRoom(room) {
		const {
			id,
			modified_at,
			participants: [participant],
			unread,
		} = room;
		const {body} = last(room.messages) ? last(room.messages) : {};
		const isToday = moment().diff(modified_at, 'days') === 0;
		const format = isToday ? 'HH:mm' : 'MM.DD.YY';
		const date = moment(modified_at).format(format);

		return (
			<li key={id} className="chat--contacts--list__item">
				<NavLink to={`/you/chat/${id}`} className="chat--contact">
					<div className="chat--contact--avatar">
						<Avatar
							size={50}
							online={participant.online}
							username={participant.username}
							picture={participant.picture}
						/>
					</div>
					<div className="chat--contact--content">
						<h5 className="chat--contact--content__username">{participant.name}</h5>
						<div className="chat--contact--content__chat-message">
							<p>{body}</p>
						</div>
					</div>

					<div className="chat--contact--meta">
						<time className="chat--contact--meta__time">{date}</time>
						<div className="chat--contact--meta__unread">
							{!!unread && (
								<span className="tag tag-counter rounded">
									{unread}
								</span>
							)}
						</div>
					</div>
				</NavLink>
			</li>
		);
	}

	render() {
		const {rooms} = this.props;

		return (
			<div className="chat--contacts">
				<div className="chat--contacts--bar" />
				<ul className="chat--contacts--list">
					{rooms.map(room =>
						this.rooms(room))}
				</ul>
			</div>
		);
	}
}

const mapStateToProps = state => ({
	rooms: roomsSelector(state),
});

export default connect(
	mapStateToProps,
	null,
)(ContactsContainer);