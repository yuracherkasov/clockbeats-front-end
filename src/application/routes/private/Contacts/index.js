import React, {PureComponent,Component} from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';

import Avatar from '../../../components/Avatar';

import {createSelector} from 'reselect';
import head from 'lodash/head';
import memoize from 'lodash/memoize';

import {
	friends,
	roomsParticipantsSelector,
} from '../Chat/selectors';

import {chatCrateRequestAction} from '../../../services/Chat/aids/actions';

{/*<div className="d-flex">*/}
{/*<div>*/}
{/*<Avatar*/}
{/*online={user.online}*/}
{/*picture={user.picture}*/}
{/*username={user.username}*/}
{/*/>*/}
{/*<Link className="h1 m-0" to={`/${user.username}`}>{user.name}</Link>*/}
{/*<p className="m-0 macro-description">{user.summary}</p>*/}
{/*</div>*/}

{/*<div>*/}
{/*<div className="w-25 ml-5">*/}
{/*<span className="ml-2" onClick={event => chatHandler(user)}>*/}
{/*<i className="fa fa-comments-o fa-fw"/>*/}
{/*</span>*/}
{/*<span className="ml-2" onClick={event => workspaceHandler(user)}>*/}
{/*<i className="fa fa-suitcase fa-fw"/>*/}
{/*</span>*/}
{/*</div>*/}
{/*</div>*/}
{/*</div>*/}

class ContactsItem extends PureComponent {
	constructor(props) {
		super(props);
	}

	render() {
		const {user, chatHandler, workspaceHandler} = this.props;

		return (
			<div className="article article-list mb-0" style={{flexFlow: 'row nowrap', alignItems: 'center', justifyContent: 'flex-start', minWidth: 320}}>
				<Avatar size={75} className="mr-2" />
				<h3 className="my-1">{user.username}</h3>
				<div className="ml-4">
					<button className="btn btn-icon" onClick={event => chatHandler(user)}>
					<span className="icon">
						<i className="fa fa-comments-o fa-fw"/>
					</span>
					</button>
					<button className="btn btn-icon" onClick={event => workspaceHandler(user)}>
					<span className="icon">
						<i className="fa fa-suitcase fa-fw"/>
					</span>
					</button>
				</div>
				{/*{user.friends*/}
					{/*? <button className="btn btn-default btn-block ml-2" style={{flex: 1}} onClick={() => unfollow(user.id)}>Unfollow</button>*/}
					{/*: <button className="btn btn-primary btn-block ml-2" style={{flex: 1}} onClick={() => follow(user.id)}>Follow</button>*/}
				{/*}*/}
			</div>
		);
	}
}

class ContactsContainer extends Component {
	constructor(props) {
		super(props);

		this.contactsList = memoize(user => this.contactItem(user));
	}

	chatHandler = user => {
		const {history, crateChat} = this.props;

		if (user.room) {
			return history.push(`/you/chat/${user.room}`);
		}

		crateChat(user.id);
	};

	workspaceHandler = user => {
		const {history} = this.props;

		history.push('/you/workspace');
	};

	contactItem(user) {
		return (
			<li key={user.id} className="workspace--list--article m-2" style={{display: 'inline-flex'}}>
				<ContactsItem
					user={user}
					chatHandler={this.chatHandler}
					workspaceHandler={this.workspaceHandler}
				/>
			</li>
		);
	}

	render() {
		const {users} = this.props;

		return (
			<div>
				<div className="contacts panel">
					<div className="container">
						<div className="contacts-wrapper">
							<ul className="workspace--list" style={{display: 'flex', flexFlow: 'row wrap', justifyContent: 'flex-start'}}>
								{users.map(contact =>
									this.contactsList(contact)
								)}
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
	(friends, roommates) => {
		return friends.map(friend => {
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
		});
	},
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