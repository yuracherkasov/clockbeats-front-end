import React, {Component} from 'react';

import Uploader from '../../../components/Uploader';
import Waveform from '../../../components/Player/components/Waveform';

function extractBuffer(buffer) {
	buffer = buffer.getChannelData(0);
	const bar = 1;
	const width = 1800;
	const height = 140;
	const length = Math.floor(buffer.length / width);
	const values = [];

	for (let i = 0; i < width; i += bar) {
		const value = bufferMeasure(i * length, length, buffer) * 10000;
		values.push(Math.floor(value));
	}

	return {
		width: width,
		height: height,
		samples: values,
	};
}

// function extractBufferTest(buffer) {
// 	const REAL_TIME_FREQUENCY = 440;
// 	const ANGULAR_FREQUENCY = REAL_TIME_FREQUENCY * 2 * Math.PI;
// 	const values = [];
//
// 	const generateSample = number => {
// 		const time = number / 44100;
// 		const angle = time * ANGULAR_FREQUENCY;
// 		return Math.sin(angle);
// 	};
//
// 	for (let i = 0 ; i < 88200 ; i++) {
// 		values[i] = generateSample(i);
// 	}
//
// 	console.log(values);
// }

function bufferMeasure(position, length, data) {
	let sum = 0.0;

	for (let i = position; i <= (position + length) - 1; i++) {
		sum += Math.pow(data[i], 2);
	}

	return Math.sqrt(sum / data.length);
}

function peaks(buffer) {
	const peak = 1;
	const length = 1800;
	const height = 140;

	const first = 0;
	const last = length - 1;

	const sampleSize = Math.floor(buffer.length / length);
	const sampleStep = Math.floor(sampleSize / 10);
	const channel = buffer.getChannelData(0);


	const peaks = [];

	let i;

	for (i = first; i <= last; i++) {
		const start = ~~(i * sampleSize);
		const end = ~~(start + sampleSize);
		let min = 0;
		let max = 0;
		let j;

		for (j = start; j < end; j += sampleStep) {
			const value = channel[j] * 1000;

			if (value > max) {
				max = value;
			}

			if (value < min) {
				min = value;
			}

			peaks[2 * i] = Math.floor(max);
			peaks[2 * i + 1] = Math.floor(min);
		}
	}

	return {
		width: length,
		height: height,
		samples: peaks,
	};
}


function spectrum() {}


export default class SettingsScene extends Component {
	constructor(props) {
		super(props);

		this.audioContext = new AudioContext();
	}

	state = {
		samples: null,
	};

	fileHandler = (file) => {
		const reader = new FileReader(file);

		if (!file) return;

		console.log('file', file);

		const handler = (event) => {
			const {result} = event.target;
			this.audioContext.decodeAudioData(result, buffer => {

				const {size} = file;
				const {duration} = buffer;

				const kbit = size / 128;
				const kbps = Math.ceil(Math.round(kbit / duration) / 16) * 16;
				const sample = extractBuffer(buffer);

				return this.setState({samples: {
					...sample,
					kbps,
					size,
					duration,
				}});
			});


			reader.removeEventListener('load', handler);
		};

		reader.addEventListener('load', handler);
		reader.readAsArrayBuffer(file);
	};



	render() {
		const {samples} = this.state;

		console.log(samples);

		return (
			<div className="container">
				{/*<Uploader*/}
					{/*onUploaded={this.fileHandler}*/}
				{/*/>*/}

				{/*<Waveform onReady={() => console.log('Waveform ready!')} sample={samples} />*/}
			</div>
		);
	}
}