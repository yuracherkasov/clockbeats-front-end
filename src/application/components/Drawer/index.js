import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {createSelector} from 'reselect/src';

import classNames from 'classnames';

class Drawer extends Component {
	static propTypes = {
		children: PropTypes.node,
		media: PropTypes.object.isRequired,
	};

	constructor(props) {
		super(props);
	}

	render() {
		const {children, media} = this.props;
		const classes = classNames('drawer', {'drawer__toggle': !media.large});

		return (
			<div className={classes}>
				<div className="drawer--wrapper">
					<div className="drawer--content">
						{children}
					</div>
				</div>
			</div>
		);
	}
}

const mediaSelector = createSelector(
	state => state.browser.media,
	(media) => media,
);

const mapStateToProps = state => ({
	media: mediaSelector(state),
});

export default connect(
	mapStateToProps,
	null,
)(Drawer);