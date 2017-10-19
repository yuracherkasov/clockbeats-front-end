import React, {Component} from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import {connect} from 'react-redux';
import {createSelector} from 'reselect';

import {audio} from './core/audio';
import {
	getPlayer,
	getPlayerIsPlaying,
	getPlayerTimes,
	getPlayerTrackId,
} from './core/selectors';

import Button from '../Buttons/components/button';
import Timeline from './components/Timeline';

import './player.scss';

class Player extends Component {
	static propTypes = {};
	static defaultProps = {};

	constructor(props) {
		super(props);
	}

	render () {
		const {player: {
			decreaseVolume,
			increaseVolume,
			isPlaying,
			pause,
			play,
			track,
			volume,
		}} = this.props;

		if (!track) {
			return null;
		}

		return (
			<div className="player-audio">
				<div style={{position: 'relative'}}>
					<div style={{position:'absolute', top: 0, right: 0, width: '100%'}}>
						<Timeline />
					</div>
				</div>

				<div className="player-content">
					<div className="player-controls">
						<Button className="btn-icon" onClick={() => console.log('prev')}>
							<i className="fa fa-step-backward" aria-hidden="true" />
						</Button>
						<Button className="btn-icon" onClick={!isPlaying ? play : pause}>
							<i className={classNames('fa', {'fa-play': !isPlaying, 'fa-pause': isPlaying})} aria-hidden="true" />
						</Button>
						<Button className="btn-icon" onClick={() => console.log('next')}>
							<i className="fa fa-step-forward" aria-hidden="true" />
						</Button>
					</div>
				</div>

			</div>
		);
	}
}

const playerSelector = createSelector(
	getPlayer,
	(player) => ({
		decreaseVolume: audio.decreaseVolume,
		increaseVolume: audio.increaseVolume,
		isPlaying: player.isPlaying,
		pause: audio.pause,
		play: audio.play,
		track: player.track,
		volume: player.volume,
	}),
);

const mapStateToProps = state => ({
	player: playerSelector(state),
});

const mapDispatchToProps = dispatch => ({

});

export default connect(
	mapStateToProps,
	mapDispatchToProps,
)(Player);