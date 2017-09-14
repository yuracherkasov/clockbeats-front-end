import React, {Component} from 'react';
import {connect} from 'react-redux';
import {NavLink, withRouter} from 'react-router-dom';

import {LargeMacroProfile} from '../../Macro-profiles';

class DrawerContainer extends Component {
	constructor(props) {
		super(props);
	}

	render() {
		const {online, user} = this.props;

		return (
			<aside className="drawer panel">
				<div className="drawer-wrapper">
					<LargeMacroProfile online={online} user={{...user, summary: 'Different kinds of caches'}} />

				</div>
			</aside>
		);
	}
}

export default withRouter(connect(
	state => ({user: state.user, online: state.socket.online}),
)(DrawerContainer));