import React, {Component} from 'react';
import moment from 'moment';

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
		const {message} = this.props;

		return (
			<div
				onClick={this.handleSelection}
				className={`message-wrapper p-2 mb-2 ${selected && 'selected'}`}
				style={!message.own ? {backgroundColor: '#eee'} : {}}
			>
				<div className="d-flex align-items-center mb-1">
					<h5 className="m-0">
						{message.issuer.name}
						{message.issuer.online
							? <small className="ml-1 text-muted text-success">online</small>
							: <small className="ml-1 text-muted">offline</small>
						}
					</h5>
					<small className="ml-1 text-muted">{moment(message.created_at).format('MMMM DD HH:mm:ss')}</small>
				</div>
				<p className="m-0">{message.body}</p>
			</div>
		);
	}
}


// TODO: add time above of messages
// const created = moment(message.created_at);
//
// const time = () => {
// 	const diff = moment().diff(created, 'days');
//
// 	if (diff > 0) {
// 		return moment().day(-diff).format("YYYY-MM-DD");
// 	}
// };