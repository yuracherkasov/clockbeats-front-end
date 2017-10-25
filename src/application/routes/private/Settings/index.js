import React, { Component } from 'react';
import Form from './components/Form';

export default class SettingsScene extends Component {

	constructor() {
		super();
	}

	state = {
		edit: false,
	}

	toggleEdit = () => {
		this.setState(({edit}) => ({edit: !edit}));
	}

	render() {
		return (
			<div className="settings-wrapper">
				<div className="settings-head">
					<button className="pull-right edit-btn" onClick={this.toggleEdit}>
						<i className="fa fa-fw fa-pencil" />edit
					</button>
					<h2>
						<i className="fa fa-cog fa-fw text-cb-gold" onClick={this.toggleEdit} />
						Manage your settings
					</h2>
				</div>
				<Form
					edit={this.state.edit}
					onCancel={this.toggleEdit}
				/>			
			</div>
		);
	}
}