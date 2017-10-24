import React, { Component } from 'react';
import Texteditor from './Texteditor';
import Passwordeditor from './Passwordeditor';
import Checkboxes from './Checkboxes';
import SelectOpts from './SelectOpts';

export default function Form(props) {

	return (
		<div className="settings-form-wrap">
			<ul className="settings-list">
				<li className="clearfix">
					<Texteditor
						caption="First Name"
						edit={props.edit}
						type="text"
						name="firstname"
						value={props.user.firstname}
						handler={(data) => props.handler(data)}
					/>
				</li>
				<li className="clearfix">
					<Texteditor
						caption="Last Name"
						edit={props.edit}
						type="text"
						name="lastname"
						value={props.user.lastname}
						handler={(data) => props.handler(data)}
					/>
				</li>
				<li className="clearfix">
					<Texteditor
						caption="Username"
						edit={props.edit}
						type="text"
						name="username"
						value={props.user.username}
						handler={(data) => props.handler(data)}
					/>
				</li>
				<li className="clearfix">
					<Texteditor
						caption="E-mail"
						edit={props.edit}
						type="email"
						name="email"
						value={props.user.email}
						handler={(data) => props.handler(data)}
					/>
				</li>
				<li className="clearfix">
					<Passwordeditor
						caption="Password"
						edit={props.edit}
						value={props.user.password || ''}
						type="password"
						required={true}
						name="password"
						handler={(data) => props.handler(data)}
					/>
				</li>
				<li className="clearfix">
					<Checkboxes
						caption="Category"
						categories={props.user.categories}
						edit={props.edit}
						type="checkbox"
						handler={props.checkCategorieHandler}
					/>
				</li>
				<li className="clearfix">
					<SelectOpts
						caption="Country"
						edit={props.edit}
						name="country"
						value={props.user.country}
						handler={(data) => props.handler(data)}
					/>
				</li>
				<li>
					<Texteditor
						caption="City"
						edit={props.edit}
						type="text"
						name="city"
						value={props.user.city}
						handler={(data) => props.handler(data)}
					/>
				</li>
				<li>
					<Texteditor
						caption="Phone Number"
						edit={props.edit}
						type="tel"
						name="phone"
						value={props.user.phone}
						handler={(data) => props.handler(data)}
					/>
				</li>
				<li>
					<Texteditor
						caption="IPI number"
						edit={props.edit}
						type="tel"
						name="IPI"
						value={props.user.IPI}
						handler={(data) => props.handler(data)}
					/>
				</li>
			</ul>
		</div>
	);

	Form.propTypes = {
		edit: PropTypes.bool,
		user: PropTypes.shape(),
		handler: PropTypes.func.isRequired,
		checkCategorieHandler: PropTypes.func.isRequired,
	};
};
