import React from 'react';
import PropTypes from 'prop-types';

// import './waveform.css';

class Waveform extends React.Component {
	static propTypes = {
		onReady: PropTypes.func.isRequired,
		sample: PropTypes.object,
	};

	// componentDidMount() {
	// 	this.loadData();
	// }

	componentWillUpdate() {
		this.removeCanvas();
	}

	componentDidUpdate() {
		this.loadData();
	}

	loadData() {
		const {sample} = this.props;
		this.renderCanvas(sample);
	}

	removeCanvas() {
		const canvas = this.container.firstChild;

		if (canvas) {
			return this.container.removeChild(canvas);
		}
	}

	renderCanvas(data) {
		const canvas = document.createElement('canvas');
		canvas.width = data.width / 2;   // 900px;
		canvas.height = data.height / 2; // 70px;

		const context = canvas.getContext('2d');
		context.fillStyle = '#2d2e2f';

		let samples = data.samples,
			l = samples.length,
			i = 0,
			x = 0,
			v;

		for (; i < l; i += 2, x++) {
			v = samples[i] / 3;
			context.fillRect(x, 0, 1, (35 - v));
			context.fillRect(x, (35 + (v / 2)), 1, 70);
		}

		this.container.appendChild(canvas);
		this.props.onReady();
	}

	render() {
		return <div className="waveform" ref={element => this.container = element} />;
	}
}

export default Waveform;