import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {createSelector} from 'reselect';
import classNames from 'classnames';

import {audio} from '../core/audio';
import {PlayerTimesState} from '../core/reducer';

export class AudioTimeline extends React.Component {
	static propTypes = {
		seek: PropTypes.func.isRequired,
		times: PropTypes.instanceOf(PlayerTimesState).isRequired,
	};

	constructor(props) {
		super(props);
	}

	handleClick = event => {
		const {currentTarget, pageX} = event;
		const {seek, times} = this.props;
		const value = (pageX - currentTarget.getBoundingClientRect().left) / currentTarget.offsetWidth * times.duration;

		seek(value);
	};

	render() {
		const {bufferedTime, percentBuffered, percentCompleted} = this.props.times;
		const classes = classNames('bar bar-buffered', {'bar-animated': bufferedTime > 0});

		return (
			<div className="player-timeline" onClick={this.handleClick}>
				<div className={classes} style={{width: percentBuffered}} />
				<div className="bar bar-completed" style={{width: percentCompleted}} />
			</div>
		);
	}
}

const mapStateToProps = createSelector(
	state => state.playerTimes,
	times => ({
		seek: audio.seek,
		times,
	})
);

export default connect(mapStateToProps)(AudioTimeline);