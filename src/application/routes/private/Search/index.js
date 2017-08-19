import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';

import {createSelector} from 'reselect';
import head from 'lodash/head';

import {usersFollowRequestAction} from '../../../services/Users/aids/actions';

class SearchScene extends Component {
	constructor(props) {
		super(props);
	}

	render() {
		const {users, follow} = this.props;

		return (
			<div>
				<div className="contacts panel">
					<div className="container">
						<div className="contacts-wrapper">
							<ul className="contacts-list">
								{users.map(user => {
									return (
										<li key={user.id} className="item">

											<div className="d-flex flex-row align-items-center justify-content-around macro macro-profile">
												<figure className="w-25 mr-3 mb-0 macro-avatar">
													<img src="https://semantic-ui.com/images/wireframe/square-image.png" alt="Avatar" />
												</figure>
												<div className="w-25">
													<h2 className="h1 m-0 macro-username">
														<Link to={`/${user.username}`} >{user.username} {user.online ? <small className="text-success font-weight-normal">online</small> : <small className="text-muted font-weight-normal">offline</small>}</Link>
													</h2>
													<p className="m-0 macro-description">{user.summary}</p>
												</div>
												<div className="w-50 ml-5">
													<span className="ml-2">
														<button type="button" className="btn btn-primary" onClick={() => follow(user.id)}>Add to friends</button>
													</span>
													<span className="ml-2">
														<button type="button" className="btn btn-secondary">Add to workspace</button>
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
	state => state.online,
	(self, users, online) =>
		users.map(user => ({
			...user,
			online: !!head(online.filter(id => user.id === id)),
		}))
);

const mapStateToProps = state => ({
	users: onlineFriends(state),
});

const mapDispatchToProps = dispatch => ({
	follow: user => dispatch(usersFollowRequestAction(user)),
});

export default connect(
	mapStateToProps,
	mapDispatchToProps,
)(SearchScene)