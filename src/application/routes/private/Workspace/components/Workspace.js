import React from 'react';
import {Link} from 'react-router-dom';

import Avatar from '../../../../components/Avatar';

import {pure} from 'recompose';
import moment from 'moment';
import random from 'lodash/random';


function WorkspaceList({item}) {
	const {
		id,
		title,
		description,
		starts_at: start,
		ends_at: end,
		creator,
		participants,
	} = item;

	const deadline = {
		date: moment(end).format('MM/DD/YYYY'),
		end: moment().from(end, true),
		expired: (moment().diff(end, 'days') > 0),
		duration: moment(start).from(end, true),
	};

	return (
		<article className="workspace--list--article">
			<div className="article article-list">
				<div className="article--header">
					<h2 className="article--header__title">
						<Link to={`/you/workspace/${id}`}>{title}</Link>
					</h2>
					<h3 className="article--header__subtitle">{description}</h3>
				</div>

				<div className="article--content">
					<div className="avatars-list">
						<Avatar size={35} online={creator.online} username={creator.username} picture={creator.picture} />

						{participants.map(user => <Avatar key={user.id} size={35} online={user.online} username={user.username} picture={user.picture} />)}

						{/*<div className="avatars-list--actions">*/}
							{/*<div className="btn btn-icon" title="More">*/}
								{/*<div className="hamburger hamburger-dotted">*/}
									{/*<span />*/}
									{/*<span />*/}
									{/*<span />*/}
								{/*</div>*/}
							{/*</div>*/}
						{/*</div>*/}
					</div>
				</div>

				<div className="article--aside">
					<div className="article--aside__meta">
						<div>
							<small className="article--aside__meta__text">ends in</small>
							<time className="article--aside__meta__text">{deadline.date}</time>
						</div>

						<ul className="icons-list">
							<li className="icons-list__icon" title="Arguments">
								<div className="meta">
									<span className="meta--item icon">
										<i className="fa fa-comments" />
									</span>
									<span className="meta--item">
										{Math.floor(Math.random() * 100)}
									</span>
								</div>
							</li>
							<li className="icons-list__icon" title="Likes">
								<div className="meta">
									<span className="meta--item icon">
										<i className="fa fa-heart" />
									</span>
									<span className="meta--item">
										{Math.floor(Math.random() * 100)}
									</span>
								</div>
							</li>

							<li className="icons-list__icon" title="Duration">
								<div className="meta">
									<span className="meta--item icon">
										<i className="fa fa-calendar" />
									</span>
									<span className="meta--item">
										{deadline.expired ? 'expired' : deadline.end}
									</span>
								</div>
							</li>
						</ul>
					</div>

					<div className="article--aside__actions">
						<div className="btn btn-icon" title="More">
							<div className="hamburger hamburger-dotted">
								<span />
								<span />
								<span />
							</div>
						</div>
					</div>
				</div>
			</div>
		</article>
	);
}

export const Workspace = pure(WorkspaceList);