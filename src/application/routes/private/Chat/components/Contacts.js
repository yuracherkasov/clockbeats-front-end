import React, {Component} from 'react';
import {NavLink} from 'react-router-dom';
import {connect} from 'react-redux';

import {roomsSelector} from '../selectors';

class ContactsContainer extends Component {
	constructor(props) {
		super(props);
	}

	render() {
		const {rooms} = this.props;

		return (
			<div className="contacts panel">
					<div className="contacts-wrapper">
						<ul className="contacts-list">

							{rooms.map(room => (
								<li key={room.id} className="item">
									<NavLink to={`/you/chat/${room.id}`}>
										<div className="d-flex flex-row align-items-center justify-content-start macro macro-profile">
											<figure className="w-25 mr-3 macro-avatar">
												<img src="https://semantic-ui.com/images/wireframe/square-image.png" alt="Avatar" />
											</figure>

											{room.participants.map(participant => (
												<div key={participant.id} className="h1 m-0 macro-username">
													<span className="mr-1">{participant.name}</span>

													{participant.online
														? <small className="text-success font-weight-normal">online</small>
														: <small className="text-muted font-weight-normal">offline</small>
													}
												</div>
											))}

										</div>
									</NavLink>
								</li>
							))}
						</ul>
					</div>
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