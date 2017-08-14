import React, {PureComponent} from 'react';
import {Link} from 'react-router-dom';

export default class LargeMacroProfile extends PureComponent {
	render() {
		const {user, online} = this.props;

		return (
			<div className="macro macro-profile">
				<div className="d-flex flex-row">
					<figure className="macro-avatar editable">
						<img src={user.picture || 'https://semantic-ui.com/images/wireframe/square-image.png'} alt={user.username} />
					</figure>
				</div>
				<div className="d-flex flex-row align-items-center justify-content-between">
					<div className="macro-username">
						<Link to={`/${user.username}`}>{user.name || user.username}</Link>
					</div>

					{online ? <span className="text-success ml-3">online</span> : <span className="text-muted ml-3">offline</span>}
				</div>

				<div className="macro-description text-muted">
					{user.description || ''}
				</div>
			</div>
		);
	}
}