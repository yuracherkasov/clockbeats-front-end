import React, {Component} from 'react';
import PropTypes from 'prop-types';

function reader(file) {
	const fr = new FileReader();

	const handler = (resolve, reject) => {
		try {
			const listener = () => {
				resolve(fr.result);

				fr.removeEventListener('load', listener);
			};

			fr.addEventListener('load', listener, false);
		} catch (error) {
			reject(error);
		}
	};

	fr.readAsDataURL(file);

	return new Promise(handler);
}

function image(image, source) {
	const handler = (resolve, reject) => {
		try {
			const listener = () => {
				const {naturalWidth, naturalHeight} = image;

				resolve({
					width: naturalWidth,
					height: naturalHeight,
				});

				image.removeEventListener('load', listener);
			};

			image.addEventListener('load', listener, false);
		} catch (error) {
			reject(error);
		}
	};

	image.src = source;

	return new Promise(handler);
}



export default class Image extends Component {
	static propTypes = {
		src: PropTypes.string,
		url: PropTypes.string,
		file: PropTypes.objectOf(File),
	};

	state = {
		loading: true,
	};

	componentDidMount() {
		const {file, url} = this.props;

		if (!file && !url) return;

		this.load()
			.then(() => this.setState({loading: false}))
			.catch(console.log);
	}

	load() {
		const {file, url} = this.props;

		if (file) {
			return reader(file)
				.then(base64 => image(this.image, base64))
				.then(image => console.log(image))
		}

		return image(this.image, url)
			.then(image => console.log(image));
	}

	render() {
		const {src} = this.props;
		const {loading} = this.state;

		return (
			<figure className="artwork">
				<img
					ref={element => this.image = element}
					src={src}
					className="artwork__image"
				/>
			</figure>
		);
	}
}