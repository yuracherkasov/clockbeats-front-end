import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';

import {createSelector} from 'reselect';
import head from 'lodash/head';

import {
	friends,
	roomsParticipantsSelector,
} from '../Chat/selectors';

import {chatCrateRequestAction} from '../../../services/Chat/aids/actions';

class ContactsContainer extends Component {
	constructor(props) {
		super(props);
	}

	render() {
		const {users, history, crateChat} = this.props;

		return (
			<div>
				<div className="contacts panel">
					<div className="container">
						<div className="contacts-wrapper">
							<ul className="contacts-list">
								{
									users.map(contact => {
										return (
											<li key={contact.id} className="item">

												<div className="d-flex flex-row align-items-center justify-content-around macro macro-profile">
													<figure className="w-25 mr-3 macro-avatar">
														<img src="https://semantic-ui.com/images/wireframe/square-image.png" alt="Avatar" />
													</figure>
													<div className="w-50">
														<Link className="h1 m-0 macro-username" to={`/${contact.username}`} >
															<span className="mr-1">{contact.name}</span>
															{contact.online
																? <small className="text-success font-weight-normal">online</small>
																: <small className="text-muted font-weight-normal">offline</small>
															}
														</Link>

														<p className="m-0 macro-description">{contact.summary}</p>
													</div>
													<div className="w-25 ml-5">
														<span className="ml-2" onClick={() => {
															if (contact.room) {
																return history.push(`/you/chat/${contact.room}`);
															}

															crateChat(contact.id);
														}}>
															<i className="fa fa-comments-o fa-fw"/>
														</span>
														<span className="ml-2" onClick={() => history.push('/you/workspace')}>
															<i className="fa fa-suitcase fa-fw"/>
														</span>
													</div>

													<div className="align-self-baseline">
														<button type="button" className="fa-fw close" aria-label="Close">
															<span aria-hidden="true">&times;</span>
														</button>
													</div>
												</div>
											</li>
										);
									})
								}
							</ul>
						</div>
					</div>
				</div>
			</div>
		);
	}
}

const roommatesSelector = createSelector(
	[friends, roomsParticipantsSelector],
	(friends, roommates) => friends.map(friend => {
		const room = head(roommates.filter(roommater => {
			if (roommater.recipient) {
				return roommater.recipient.id === friend.id;
			}
			return false;
		}));

		if (room) {
			return {
				...friend,
				room: room.roomId,
			};
		}

		return friend;
	}),
);

const mapStateToProps = state => ({
	users: roommatesSelector(state),
});

const mapDispatchToProps = dispatch => ({
	crateChat: participants => dispatch(chatCrateRequestAction(participants)),
});

export default connect(
	mapStateToProps,
	mapDispatchToProps,
)(ContactsContainer);