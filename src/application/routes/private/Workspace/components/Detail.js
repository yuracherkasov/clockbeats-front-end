import React, {Component, Children, cloneElement} from 'react';
import PropTypes from 'prop-types';

import {connect} from 'react-redux';

import {workspaceSelector} from '../selectors';

import {
	argumentCreateRequestedAction,
} from '../../../../services/Workspace/aids/actions';

import Argues from '../core/Arguments/List';

function Panel({head, main, aside, footer}) {
	return (
		<div className="panel">
			<div className="panel-header"/>
			<div className="panel-content">
				<section className="panel-content--main">
					{main}
				</section>
				<aside className="panel-content--aside">
					{Children.map(aside, (element) => cloneElement(element, {className: 'panel-content--aside-module'}))}
				</aside>
			</div>
			<div className="panel-footer"/>
		</div>
	);
}

Panel.propTypes = {
	head: PropTypes.node,
	main: PropTypes.node,
	aside: PropTypes.node,
	footer: PropTypes.node,
};

class WorkspaceDetail extends Component {
	static propTypes = {
		user: PropTypes.object.isRequired,
		workspace: PropTypes.object.isRequired,
	};

	constructor(props) {
		super(props);
	}

	renderWorkspaceInfo() {
		const {workspace: {
			archived,
			created_at,
			creator,
			description,
			ends_at,
			participants,
			starts_at,
			title,
		}} = this.props;


		return (
			<div>
				<h1>{title}</h1>
				<p>{description}</p>
			</div>
		);
	}

	render() {
		const {match: {params: {workspace}}} = this.props;

		return(
			<div className="workspace-argues">
				<Panel
					main={<Argues workspace={workspace} />}
					aside={this.renderWorkspaceInfo()}
				/>
			</div>
		);
	}
}

const mapStateToProps = (state, ownProps) => ({
	user: state.user,
	online: state.user.online,
	workspace: workspaceSelector(state, ownProps),
});

const mapDispatchToProps = dispatch => ({
	postArgue: ({issuer, body, media, workspace}) => dispatch(argumentCreateRequestedAction({issuer, body, media, workspace})),
});

export default connect(
	mapStateToProps,
	mapDispatchToProps,
)(WorkspaceDetail);