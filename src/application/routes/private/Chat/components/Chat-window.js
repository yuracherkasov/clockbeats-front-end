import React, {Component} from 'react';

export default class ChatWindowContainer extends Component {
	constructor(props) {
		super(props);
	}

	render() {
		const {messages} = this.props;

		return (
			<div className="chat-messages">
				<div className="chat-messages-wrapper">
					{/*{messages.map(message => <p>{message.body}</p>)}*/}

					<p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. A amet autem debitis distinctio eius esse explicabo incidunt laboriosam modi natus officiis, optio quos reiciendis rem saepe sapiente sint unde voluptatibus.</p>
					<p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. A amet autem debitis distinctio eius esse explicabo incidunt laboriosam modi natus officiis, optio quos reiciendis rem saepe sapiente sint unde voluptatibus.</p>
					<p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. A amet autem debitis distinctio eius esse explicabo incidunt laboriosam modi natus officiis, optio quos reiciendis rem saepe sapiente sint unde voluptatibus.</p>
					<p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. A amet autem debitis distinctio eius esse explicabo incidunt laboriosam modi natus officiis, optio quos reiciendis rem saepe sapiente sint unde voluptatibus.</p>
					<p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. A amet autem debitis distinctio eius esse explicabo incidunt laboriosam modi natus officiis, optio quos reiciendis rem saepe sapiente sint unde voluptatibus.</p>
					<p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. A amet autem debitis distinctio eius esse explicabo incidunt laboriosam modi natus officiis, optio quos reiciendis rem saepe sapiente sint unde voluptatibus.</p>
					<p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. A amet autem debitis distinctio eius esse explicabo incidunt laboriosam modi natus officiis, optio quos reiciendis rem saepe sapiente sint unde voluptatibus.</p>
					<p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. A amet autem debitis distinctio eius esse explicabo incidunt laboriosam modi natus officiis, optio quos reiciendis rem saepe sapiente sint unde voluptatibus.</p>
					<p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. A amet autem debitis distinctio eius esse explicabo incidunt laboriosam modi natus officiis, optio quos reiciendis rem saepe sapiente sint unde voluptatibus.</p>
					<p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. A amet autem debitis distinctio eius esse explicabo incidunt laboriosam modi natus officiis, optio quos reiciendis rem saepe sapiente sint unde voluptatibus.</p>
					<p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. A amet autem debitis distinctio eius esse explicabo incidunt laboriosam modi natus officiis, optio quos reiciendis rem saepe sapiente sint unde voluptatibus.</p>
					<p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. A amet autem debitis distinctio eius esse explicabo incidunt laboriosam modi natus officiis, optio quos reiciendis rem saepe sapiente sint unde voluptatibus.</p>
					<p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. A amet autem debitis distinctio eius esse explicabo incidunt laboriosam modi natus officiis, optio quos reiciendis rem saepe sapiente sint unde voluptatibus.</p>
					<p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. A amet autem debitis distinctio eius esse explicabo incidunt laboriosam modi natus officiis, optio quos reiciendis rem saepe sapiente sint unde voluptatibus.</p>
					<p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. A amet autem debitis distinctio eius esse explicabo incidunt laboriosam modi natus officiis, optio quos reiciendis rem saepe sapiente sint unde voluptatibus.</p>
				</div>
			</div>
		);
	}
}