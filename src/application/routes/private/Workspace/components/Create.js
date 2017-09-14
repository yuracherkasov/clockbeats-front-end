import React, {Component} from 'react';
import {connect} from 'react-redux';

// Base components


// Main components
import Input from '../../../../components/Input';


// selectors
import {onlineSelector} from '../../Chat/selectors';

//actions
import {workspaceCreateRequestAction} from '../../../../services/Workspace/aids/actions';

// helpers
import moment from 'moment';
import {random} from 'lodash';

class WorkspaceCreate extends Component {
	constructor(props) {
		super(props);
	}

	state = {
		title: {
			value: undefined,
			valid: false,
		},
		description: {
			value: undefined,
			valid: false,
		},
		start: {
			value: moment(),
			valid: true,
		},
		end: {
			value: moment().day(random(1, 365)),
			valid: true,
		},
		participants: [],
	};

	cancelHandler = event => {
		const {cancel} = this.props;

		cancel(event);
	};

	createHandler = event => {
		event.preventDefault();
		const {create, cancel} = this.props;
		const {title, description, participants, start, end} = this.state;

		const data = {
			title: title.value,
			description: description.value,
			participants,
			start: start.value.toISOString(),
			end: end.value.toISOString(),
		};

		create(data);
		cancel(event);
	};

	inputHandler = input => {
		const {name, value, valid} = input;

		this.setState({[name]: {value, valid}});
	};

	dateHandler = input => {
		const {name, value, valid} = input;

		this.setState({[name]: {
			value: moment(value),
			valid,
		}});
	};

	membersHandler = event => {
		const {value} = event.target;

		this.setState(state => ({participants: [...state.participants, value]}));
	};

	removeSelectedMember = member => {
		this.setState(state => ({participants: state.participants.filter(user => user !== member)}));
	};

	renderSelectedMembers() {
		const {users} = this.props;
		const {participants} = this.state;

		const selected = users.filter(user => participants.indexOf(user.id) !== -1);

		return selected.map(member =>
			<div key={member.id} className="mr-2" onClick={() => this.removeSelectedMember(member.id)}>
				{member.username}
			</div>
		);
	}


	render() {
		const {
			title,
			description,
			start,
			end,
			participants,
		} = this.state;

		const {users} = this.props;
		const canSubmit = !!([title, description, start, end].filter(item => !item.valid).length);

		return (
			<div className="create-workspace">
				<div className="create-workspace--header">
					<div className="create-workspace--content__title">Create new workspace</div>
					<div className="create-workspace--content__subtitle">Some description</div>
				</div>
				<div className="create-workspace--content">
					<div className="create-workspace--content__form">
						<Input
							type="text"
							name="title"
							value={title.value}
							required
							validate={false}
							placeholder="Title"
							rootClasses="form-group"
							inputClasses="form-control"
							handler={this.inputHandler}
						/>
						<Input
							type="text"
							name="description"
							value={description.value}
							required
							validate={false}
							placeholder="Description"
							rootClasses="form-group"
							inputClasses="form-control"
							handler={this.inputHandler}
						/>
						<div className="form-group__inline">
							<Input
								type="text"
								name="start"
								value={start.value.format('DD/MM/YYYY')}
								required
								validate={false}
								placeholder="Starts in"
								rootClasses="form-group"
								inputClasses="form-control"
								handler={this.dateHandler}
							/>

							<Input
								type="text"
								name="end"
								value={end.value.format('DD/MM/YYYY')}
								required
								validate={false}
								placeholder="Ends in"
								rootClasses="form-group"
								inputClasses="form-control"
								handler={this.dateHandler}
							/>
						</div>
						<div className="form-group__inline">
							<span className="mr-2">Participants:</span>
							{this.renderSelectedMembers()}
						</div>
						<div className="form-group__inline">
							<select className="form-control" onChange={this.membersHandler}>
								{users.map(user =>
									<option key={user.id} value={user.id} className="">{user.username}</option>
								)}
							</select>
						</div>
					</div>
					<div className="create-workspace--content__actions pull-right">
						<button className="btn btn-primary mr-2" onClick={this.createHandler} disabled={canSubmit}>Create</button>
						<button className="btn btn-default" onClick={this.cancelHandler}>Cancel</button>
					</div>
				</div>
			</div>
		);
	}
}

const mapStateToProps = state => ({
	users: onlineSelector(state),
});

const mapDispatchToProps = dispatch => ({
	create: ({title, description, start, end, participants}) => dispatch(workspaceCreateRequestAction({title, description, start, end, participants})),
});

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(WorkspaceCreate);