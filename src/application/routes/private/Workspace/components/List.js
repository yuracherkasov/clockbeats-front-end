import React, {Component} from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';

// third part components
import {Link} from 'react-router-dom';
import ReactModal from 'react-modal';

// components
import Create from './Create';
import {Argument} from './Argument';
import {Workspace} from './Workspace';

// helpers
import memoize from 'lodash/memoize';

//selectors
import {workspacesSelector} from '../selectors';

class WorkspaceList extends Component {
	static propTypes = {
		argues: PropTypes.array.isRequired,
		workspaces: PropTypes.array.isRequired,
	};

	constructor(props) {
		super(props);

		this.arguesList = memoize(article => this.renderArgues(article));
		this.workspacesList = memoize(article => this.renderWorkspace(article));
	}

	state = {
		creating: false,
	};


	handleCreating = (event) => {
		this.setState(state => ({creating: !state.creating}));
	};

	renderWorkspace(article) {
		return <Workspace key={article.id} item={article} />
	}

	renderArgues(argument) {
		return <Argument key={argument.id} item={argument} />
	}

	render() {
		const {creating} = this.state;
		const {workspaces, argues} = this.props;

		return (
			<div>
				<div className="workspace--filter" />

				<div className="workspace--wrapper">
					<div className="workspace--list">
						{workspaces.map(workspace =>
							this.workspacesList(workspace))
						}
					</div>
					<div className="workspace--aside">
						<div className="workspace--aside--module">
							<div className="workspace--aside--module__header borderless">
								<div className="info-workspace">
									<h3 className="info-workspace__title">Active</h3>
									<h4 className="info-workspace__subtitle">12</h4>
								</div>

								<div className="info-workspace">
									<h3 className="info-workspace__title">Archived</h3>
									<h4 className="info-workspace__subtitle">3</h4>
								</div>

								<div className="info-workspace">
									<h3 className="info-workspace__title">Arguments</h3>
									<h4 className="info-workspace__subtitle">64</h4>
								</div>
							</div>
						</div>


						<div className="workspace--aside--module">
							<button className="btn btn-primary btn-block" onClick={this.handleCreating}>Create workspace</button>
						</div>

						<div className="workspace--aside--module">
							<div className="workspace--aside--module__header">
								<div className="workspace--aside--module__meta">
									<div className="meta">
										<span className="meta--item__medium">
											<i className="fa fa-comment" />
										</span>
										<span className="meta--item__medium">64</span>
										<span className="meta--item__medium">arguments</span>
									</div>
								</div>
								<div className="workspace--aside--module__meta">
									<Link to="/you/workspace/arguments">View all</Link>
								</div>
							</div>

							<div className="workspace--aside--module__content">
								{argues.map(argue =>
									this.arguesList(argue))
								}
							</div>
						</div>
					</div>
				</div>


				<ReactModal
					isOpen={creating}
					contentLabel="Create new workspace"
					onRequestClose={this.handleCreating}
					className="modal__content"
					overlayClassName="modal__overlay"
					parentSelector={() => document.querySelector('#root')}
				>
					<Create cancel={this.handleCreating} />
				</ReactModal>


			</div>
		);
	}
}

const ARG_MOCK = [
	{id: 1, body: 'So awesome project! Love it!'},
	{id: 2, media: {img: 'https://s3-eu-west-1.amazonaws.com/clb-staging.ie/users/587de56d08fe32220074146a/1501750372685.png'}},
	{id: 3, body: 'Hooman, you are the best. Love your pillow and legs!'},
	{id: 4, body: 'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.'},
];

const mapStateToProps = state => ({
	argues: ARG_MOCK,
	workspaces: workspacesSelector(state),
});

export default connect(
	mapStateToProps
)(WorkspaceList);