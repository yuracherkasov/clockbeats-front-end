import React, { Component } from 'react';
import Form from './components/Form';
import { fakeUser } from './components/FAKE';

export default class SettingsScene extends Component {

	constructor() {
		super();
		this.state = {
			edit: false,
			user: fakeUser,
		}
	}

	cancelHandler = () => {
		this.setState({
			edit: false,
			user: fakeUser,
		})
	}

	saveHandler = () => {
		this.setState({
			edit: false,
		})
		console.log('saveHandler: ');
	}

	makeEditHandler = (e) => {
		e.preventDefault();
		this.setState({
			edit: true,
		})
	}

	deleteHandler = () => {
		confirm();
	}

	changeHandler = (data) => {
		this.setState({
			user: {
				...this.state.user,
				[data.name]: data.value,
			},
		});
		console.log('changeHandler: ', this.state);
	}

	checkCategorieHandler = (event, category) => {
		const categories = this.state.user.categories;
		if (event.target.checked) {
			categories.push(category);
		} else {
			const i = categories.indexOf(category);
			categories.splice(i, 1);
		}
		this.setState({
			user: {
				...this.state.user,
				categories: categories,
			},
		});
	}

	render() {
		const buttons = this.state.edit ?
			(<div>
				<button
					className="btn settings-submit"
					onClick={this.saveHandler}>Save</button>
				<button
					className="btn settings-cancel"
					onClick={this.cancelHandler}>Cancel</button>
			</div>) :
			(<button
				className="btn settings-delete"
				onClick={this.deleteHandler}
				>Delete account</button>)

		return (
			<div className="settings-wrapper">
				<div className="settings-head">
					<a href="" className="pull-right" onClick={this.makeEditHandler}>
						<i className="fa fa-fw fa-pencil" />edit
					</a>
					<h2>
						<i className="fa fa-cog fa-fw text-cb-gold" onClick={this.makeEditHandler} />
						Manage your settings
					</h2>
				</div>
				<Form
					user={this.state.user}
					edit={this.state.edit}
					handler={this.changeHandler}
					checkCategorieHandler={this.checkCategorieHandler}
				/>			
				<div className="settings-btns clearfix">
					{buttons}
				</div>
				<div className="settings-problems">
					<i className="fa fa-fw fa-question-circle" />					
					<span>Any problem?</span>
					Contact us at 
					<a href="mailto:support@clockbeats.com">support@clockbeats.com</a>
				</div>	
			</div>
		);
	}
}