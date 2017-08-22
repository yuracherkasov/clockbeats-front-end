import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';

import {createSelector} from 'reselect';
import head from 'lodash/head';

import {
	usersFollowRequestAction,
	usersUnfollowRequestAction,
} from '../../../services/Users/aids/actions';

class SearchScene extends Component {
	constructor(props) {
		super(props);
	}

	state = {
		search: '',
	};

	render() {
		const {search} = this.state;
		const {users, follow, unfollow} = this.props;

		return (
			<div>
				<div className="pt-3">
					<div className="container">
						<div className="wide-search panel">
							<div className="form-group">
								<input
									onChange={event => {
										this.setState({search: event.target.value});
									}}
									value={search}
									type="text"
									className="form-control form-control-lg"
									placeholder="Search Contacts"
								/>
							</div>
						</div>
					</div>
				</div>

				<div className="contacts panel">
					<div className="container">
						<div className="contacts-wrapper">
							<ul className="contacts-list">
								{users.filter(user => user.username.match(search)).map(user => {
									return (
										<li key={user.id} className="item">

											<div className="d-flex flex-row align-items-center justify-content-around macro macro-profile">
												<figure className="w-25 mr-3 mb-0 macro-avatar">
													<img src="https://semantic-ui.com/images/wireframe/square-image.png" alt="Avatar" />
												</figure>
												<div className="w-50">
													<Link className="h1 m-0 macro-username" to={`/${user.username}`} >
														<span className="mr-1">{user.name}</span>
														{user.online
															? <small className="text-success font-weight-normal">online</small>
															: <small className="text-muted font-weight-normal">offline</small>
														}
													</Link>
													<p className="m-0 macro-description">{user.summary}</p>
												</div>
												<div className="w-25 ml-5">
													{!user.friends && (
														<span className="ml-2">
															<button type="button" className="btn btn-primary btn-sm" onClick={() => follow(user.id)}>Follow</button>
														</span>
													)}

													{user.friends && (
														<span className="ml-2">
															<button type="button" className="btn btn-warning btn-sm" onClick={() => unfollow(user.id)}>Unfollow</button>
														</span>
													)}

													<span className="ml-2">
														<button type="button" className="btn btn-secondary btn-sm">Add to workspace</button>
													</span>
												</div>
											</div>
										</li>
									);
								})}
							</ul>
						</div>
					</div>
				</div>
			</div>
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