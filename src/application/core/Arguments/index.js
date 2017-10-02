const ARGUES_MOCK = [
	{
		body: "ooas osdalsadllas ↵asd ad ↵asd asdasdasdad asd↵as as dasd aasdasd↵asdasdsad",
		comments: [],
		created_at: "2017-09-20T19:10:54.760Z",
		id: "59c2bd3e4ecd2f748f940955",
		issuer: "59a0631e38b7d8445cddd8e5",
		likes: [],
		modified_at: "2017-09-20T19:10:54.760Z",
		votes: [],
		workspace: "59c17668c5382c694f347d8d",
	}
];

import React from 'react';
import PropTypes from 'prop-types';

import {createSelector} from 'reselect';
import {connect} from 'react-redux';
import {compose, withStateHandlers} from 'recompose';



const onlineSelector = createSelector(
	state => state.user,
	state => state.users,
	state => state.online,
	(self, users, online) => {
		return users
			.map(user => ({
				...user,
				online: !!head(online.filter(id => user.id === id)),
			}));
	}
);

function Argues({argues, }) {}

function Argue({argue, user, edit, remove, like, vote}) {

	return (
		<div className="">
			<div>{argue.body}</div>
		</div>
	);
}

Argue.propTypes = {
	argue: PropTypes.object.isRequired,
	user: PropTypes.object.isRequired,
	edit: PropTypes.func.isRequired,
	remove: PropTypes.func.isRequired,
	like: PropTypes.func.isRequired,
	vote: PropTypes.func.isRequired,
};