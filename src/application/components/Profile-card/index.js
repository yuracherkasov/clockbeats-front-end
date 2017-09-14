import React, {Component} from 'react';

import Avatar from '../Avatar';

export function ProfileCardLarge({user}) {
	const {
		name,
		username,
		picture,
		online,
		summary,
	} = user;

	return (
		<div className="profile-card profile-card__large">
			<div className="profile-card--avatar">
				<Avatar username={username} online={online} picture={picture} editable size={75} />
			</div>
			<div className="profile-card--content">
				<h3 className="profile-card--content__username u-txt-truncate">{name || username}</h3>
				<h4 className="u-txt-truncate profile-card--content__summary">Lorem ipsum dolor sit amet, consectetur adipisicing elit.</h4>
			</div>
		</div>
	);
}

