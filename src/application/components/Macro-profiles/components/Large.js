import React from 'react';
import {Link} from 'react-router-dom';

export default function LargeMacroProfile({user, online}) {
	return (
		<div className="macro macro-profile">
			<div className="d-flex flex-row">
				<figure className="macro-avatar editable">
					<img src="https://s3-eu-west-1.amazonaws.com/clb-production.ie/users/585978cc85472a22002f8a1e/1482262904195" alt="Paolo Mantini"/>
				</figure>
			</div>
			<div className="d-flex flex-row align-items-center justify-content-between">
				<div className="macro-username">
					<Link to="/paolomantini">Paolo Mantini</Link>
				</div>

				{online ? <span className="text-success ml-3">online</span> : <span className="text-muted ml-3">offline</span>}
			</div>

			<div className="macro-description text-muted">
				DJs, Music Business Management, Performers, Writers, Composers, Record Labels, Audio Engineers, Sound designers
			</div>
		</div>
	);
}