import React, {Component} from 'react';
import {Switch, Route} from 'react-router-dom';

import WorkspaceList from './components/List';
import WorkspaceDetail from './components/Detail';

class WorkspaceScene extends Component {
	constructor(props) {
		super(props);
	}

	render() {
		const {match} = this.props;

		return (
			<div className="workspace">
				<Switch>
					<Route exact path={`${match.path}`} component={WorkspaceList} />
					<Route path={`${match.path}/:workspace`} component={WorkspaceDetail} />
				</Switch>
			</div>
		);
	}
}

export default WorkspaceScene;