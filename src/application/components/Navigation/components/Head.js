import React from 'react';
import {NavLink} from 'react-router-dom';

const LINKS = [
	{to: '/', text: 'Home', exact: true,},
	{to: '/intro', text: 'Intro', exact: false,},
	{to: '/sign-in', text: 'Sign In', exact: false,},
	{to: '/sign-up', text: 'Sign Up', exact: false,},
	{to: '/you', text: 'You', exact: true,},
	{to: '/you/profile', text: 'Profile', exact: false,},
];

function links(user) {
	const map = (link, index) =>
		<NavLink key={index} to={link.to} exact={link.exact} activeClassName="active" className="item">{link.text}</NavLink>;

	const publicLinks = LINKS.map(map);

	if (user.username) {
		const userLink = <NavLink key={user.id} to={`/${user.username}`} activeClassName="active" className="item">{user.name}</NavLink>;

		return [
			...publicLinks.slice(0, 2),
			...publicLinks.slice(4),
			userLink
		];
	}

	return publicLinks.slice(0, 4);
}


export default function HeadNavigation({user}) {

	return (
		<div className="container">
			<div className="row">
				<div className="col">
					<nav className="navigation navigation-head">
						{links(user)}
					</nav>
				</div>
			</div>
		</div>
	)
}