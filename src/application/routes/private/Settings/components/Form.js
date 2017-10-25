import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Texteditor from './Texteditor';
import Passwordeditor from './Passwordeditor';
import Checkboxes from './Checkboxes';
import SelectOpts from './SelectOpts';
import { fakeUser } from './FAKE';

export default class Form extends Component {

	static propTypes = {
		edit: PropTypes.bool,
		onCancel: PropTypes.func.isRequired,
	};

	constructor(props) {
		super(props);
	}

	state = {
		user: fakeUser,
	}

	get buttons() {
		const { edit } = this.props;

		return edit
			? (<div>
				<button
					className="btn btn-primary"
					onClick={this.saveHandler}>Save</button>
				<button
					className="btn btn-default"
					onClick={this.cancelHandler}>Cancel</button>
			</div>)
			: null;
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

	cancelHandler = () => {
		this.setState({
			user: fakeUser,
		})
		this.props.onCancel();
	}

	saveHandler = () => {
		this.props.onCancel();
		console.log('saveHandler: ');
	}

	deleteHandler = () => {
		confirm();
	}

	render() {
		const { user } = this.state;
		const { edit } = this.props;

		return (
			<div className="settings-form-wrap">
				<ul className="settings-list">
					<li className="clearfix">
						<Texteditor
							caption="First Name"
							edit={edit}
							type="text"
							name="firstname"
							value={user.firstname}
							handler={this.changeHandler}
						/>
					</li>
					<li className="clearfix">
						<Texteditor
							caption="Last Name"
							edit={edit}
							type="text"
							name="lastname"
							value={user.lastname}
							handler={this.changeHandler}
						/>
					</li>
					<li className="clearfix">
						<Texteditor
							caption="Username"
							edit={edit}
							type="text"
							name="username"
							value={user.username}
							handler={this.changeHandler}
						/>
					</li>
					<li className="clearfix">
						<Texteditor
							caption="E-mail"
							edit={edit}
							type="email"
							name="email"
							value={user.email}
							handler={this.changeHandler}
						/>
					</li>
					<li className="clearfix">
						<Passwordeditor
							caption="Password"
							edit={edit}
							value={user.password || ''}
							type="password"
							required={true}
							name="password"
							handler={this.changeHandler}
						/>
					</li>
					<li className="clearfix">
						<Checkboxes
							caption="Category"
							categories={user.categories}
							edit={edit}
							type="checkbox"
							handler={this.checkCategorieHandler}
						/>
					</li>
					<li className="clearfix">
						<SelectOpts
							caption="Country"
							edit={edit}
							name="country"
							value={user.country}
							handler={this.changeHandler}
						/>
					</li>
					<li>
						<Texteditor
							caption="City"
							edit={edit}
							type="text"
							name="city"
							value={user.city}
							handler={this.changeHandler}
						/>
					</li>
					<li>
						<Texteditor
							caption="Phone Number"
							edit={edit}
							type="tel"
							name="phone"
							value={user.phone}
							handler={this.changeHandler}
						/>
					</li>
					<li>
						<Texteditor
							caption="IPI number"
							edit={edit}
							type="tel"
							name="IPI"
							value={user.IPI}
							handler={this.changeHandler}
						/>
					</li>
					<li>
						<div className="textedit-group">
							<div className="setting-caption">Delete Account</div>
							<div className="setting-description">
								<div className="editable-text">
									<button
										className="btn btn-danger"
										onClick={this.deleteHandler}>Delete</button>
								</div>
							</div>
						</div>
					</li>
				</ul>
				<div className="settings-btns clearfix">
					{this.buttons}
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
};
