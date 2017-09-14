import React, {PureComponent} from 'react';
import {Link} from 'react-router-dom';

import Avatar from '../../Avatar';

export default class LargeMacroProfile extends PureComponent {
	render() {
		const {user, online} = this.props;

		return (
			<div className="macro macro-profile">
				<div className="d-flex flex-row">
					<Avatar
						size={75}
						online={online}
						editable
						username={user.username}
						picture={user.picture}
					/>
				</div>
				<div className="d-flex flex-row align-items-center justify-content-between">
					<Link to={`/${user.username}`} className="macro-username" >{user.name || user.username}</Link>

					{online
						? <span className="text-success ml-3">online</span>
						: <span className="text-muted ml-3">offline</span>
					}
				</div>

				<div className="macro-description text-muted">
					{user.summary || ''}
				</div>
			</div>
		);
	}
}