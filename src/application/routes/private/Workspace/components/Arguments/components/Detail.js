import React from 'react';
import {Link} from 'react-router-dom';

import {memoize} from 'lodash';
import moment from 'moment';

const memoizeContent = memoize((paragraph, index) => <p key={index}>{paragraph}</p>);

function Argue({argue}) {
	const {
		body,
		issuer,
		created_at,
		comments,
		likes,
		votes,
	} = argue;

	const content = body.split('\n').map(memoizeContent);

	return (
		<div className="argue argue-detail">
			<div className="argue--header">
				<div className="argue--header__author">
					<Avatar
						size={40}
						username={issuer.name}
						picture={issuer.picture}
						online={issuer.online}
						className="mr-2"
					/>
					<h4>
						<Link to={`/${issuer.username}`}>{issuer.name}</Link>
					</h4>

				</div>
				<div className="argue--header__time ml-2">
					{moment(created_at).format('hh:mm A')}
				</div>

				<div className="argue--header__actions">
					<div className="btn btn-icon" title="More">
						<div className="hamburger hamburger-dotted">
							<span />
							<span />
							<span />
						</div>
					</div>
				</div>
			</div>
			<div className="argue--content">
				{content}
			</div>
			<div className="argue--footer">
				{/*<div className="tags-list">*/}
					{/*<span className="tag tag-text rounded mr-1">#Lorem ipsum</span>*/}
					{/*<span className="tag tag-text rounded mr-1">#dolor sit amet</span>*/}
					{/*<span className="tag tag-text rounded mr-1">#consectetur</span>*/}
					{/*<span className="tag tag-text rounded mr-1">#adipiscing elit</span>*/}
					{/*<span className="tag tag-text rounded mr-1">#Aenean et massa</span>*/}
					{/*<span className="tag tag-text rounded mr-1">#vitae odio</span>*/}
					{/*<span className="tag tag-text rounded mr-1">#eleifend efficitur</span>*/}
					{/*<span className="tag tag-text rounded mr-1">#ut vehicula tellus</span>*/}
				{/*</div>*/}
				<ul className="icons-list ml-auto">
					<li className="icons-list__icon" title="Likes">
						<div className="meta">
							<span className="meta--item__medium icon">
								<i className="fa fa-heart" />
							</span>
							<span className="meta--item__medium">
								{likes.length}
							</span>
						</div>
					</li>
					<li className="icons-list__icon" title="Diamonds">
						<div className="meta">
							<span className="meta--item__medium icon">
								<i className="fa fa-diamond" />
							</span>
							<span className="meta--item__medium">
								{votes.length}
							</span>
						</div>
					</li>
				</ul>
			</div>

			<div className="argue--addition">
				{/*<div className="comments-module" style={{width: '100%'}}>*/}
					{/*<div className="comments-module--form">*/}
						{/*<Input name='comment' handler={console.log} />*/}
					{/*</div>*/}
					{/*<CommentsList comments={comments} />*/}
				{/*</div>*/}
			</div>
		</div>
	);
}

export default Argue;