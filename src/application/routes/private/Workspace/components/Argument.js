import React from 'react';
import {Link} from 'react-router-dom';

import {pure} from 'recompose';


// TODO: add "show more/less" if body/media content more then 75px
function ArgumentAside({item}) {
	const {
		body,
		media,
	} = item;

	return (
		<div className="argument argument-tiny">
			<div className="argument--header">
				<Link to="/eggcllent" className="argument--header__author">Stewie Brown</Link>
				<span className="argument--header__text">on project</span>
				<Link to="/you/workspace/projectID" className="argument--header__project">Just for fun</Link>
				<time className="argument--header__time">3 hours ago</time>
			</div>
			<div className="argument--content">
				{body && (<p>{body}</p>)}
				{media && (
					<figure>
						<img src={media.img} alt="Argument photo" />
					</figure>
				)}
			</div>
			<div className="argument--meta">
				<div className="meta">
					<span className="meta--item__medium">
						<i className="fa fa-comment" />
					</span>
					<span className="meta--item__medium">64</span>
				</div>
				<div className="meta">
					<span className="meta--item__medium">
						<i className="fa fa-heart" />
					</span>
					<span className="meta--item__medium">12</span>
				</div>
			</div>
		</div>
	);
}

export const Argument = pure(ArgumentAside);