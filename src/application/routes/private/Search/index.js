import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';

import {createSelector} from 'reselect';
import head from 'lodash/head';

import Avatar from '../../../components/Avatar';

import {
	usersFollowRequestAction,
	usersUnfollowRequestAction,
} from '../../../services/Users/aids/actions';

class SearchScene extends Component {
	constructor(props) {
		super(props);
	}

	render() {
		const {users, follow, unfollow} = this.props;

		return (
			<ul className="workspace--list" style={{display: 'flex', flexFlow: 'row wrap', justifyContent: 'space-between'}}>
				{users.map(user => (
					<li key={user.id} className="workspace--list--article m-2" style={{display: 'inline-flex'}}>
						<div className="article article-list mb-0" style={{flexFlow: 'row nowrap', alignItems: 'center', justifyContent: 'space-between', minWidth: 320}}>
							<Avatar size={75} className="mr-2" />
							<h3 className="my-1">{user.username}</h3>
							{user.friends
								? <button className="btn btn-default btn-block ml-2" style={{flex: 1}} onClick={() => unfollow(user.id)}>Unfollow</button>
								: <button className="btn btn-primary btn-block ml-2" style={{flex: 1}} onClick={() => follow(user.id)}>Follow</button>
							}
						</div>
					</li>
				))}
			</ul>
		);
	}
}

const onlineFriends = createSelector(
	state => state.user,
	state => state.users,
	state => state.contacts,
	state => state.online,
	(self, users, contacts, online) => {
		const {following} = contacts;

		return users.filter(user => user.id !== self.id).map(user => ({
			...user,
			online: !!head(online.filter(id => user.id === id)),
			friends: !!head(following.filter(id => user.id === id)),
		}));
	}
);

const mapStateToProps = state => ({
	users: onlineFriends(state),
});

const mapDispatchToProps = dispatch => ({
	follow: user => dispatch(usersFollowRequestAction(user)),
	unfollow: user => dispatch(usersUnfollowRequestAction(user)),
});

export default connect(
	mapStateToProps,
	mapDispatchToProps,
)(SearchScene)