import React, {Component} from 'react';
import classNames from 'classnames';
import moment from 'moment';

import Avatar from '../../../../components/Avatar';

export default class Message extends Component {
	constructor(props) {
		super(props);
	}

	state = {
		selected: false,
	};

	handleSelection = event => {
		event.preventDefault();

		this.setState(state => ({selected: !state.selected}));
	};


	render() {
		const {selected} = this.state;
		const {message: {
			own,
			repeated,
			issuer,
			body,
			created_at,
		}} = this.props;
		const messageClasses = classNames('chat--message', {selected, 'own': own, 'repeated': repeated});

		return (
			<li className="chat--room-window--messages--list__item">
				<div className={messageClasses} onClick={this.handleSelection}>
					<div className="chat--message--avatar">
						{!repeated && (
							<Avatar size={30} indicator={false} username={issuer.username} picture={issuer.picture} />
						)}
					</div>
					<div className="chat--message--content">
						<div className="chat--message--content__body">
							{body}
						</div>
						<time className="chat--message--content__time">{moment(created_at).format('hh:mm A')}</time>
					</div>
				</div>
			</li>
		);
	}
}