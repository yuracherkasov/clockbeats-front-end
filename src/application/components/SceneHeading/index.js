import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {withRouter} from 'react-router-dom';

class SceneHeading extends Component {
	static propTypes = {
		title: PropTypes.string,
	};

	constructor(props) {
		super(props);
	}

	render() {
		// TODO: though the location.state can be passed data of what actually is this route
		// but it's works only if we pressing the Link component
		const {title} = this.props;

		return (
			<div className="scene-heading">
				<h2 className="scene-title">{title}</h2>

				<div className="breadcrumbs" />
			</div>
		);
	}
}

export default withRouter(SceneHeading);