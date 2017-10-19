import React, {Component} from 'react';
import PropTypes from 'prop-types';

class Uploader extends Component {
	static propTypes = {
		size: PropTypes.number,
		type: PropTypes.oneOf(['photo', 'video', 'audio']),
		validate: PropTypes.bool,

		onError: PropTypes.func,
		onUploaded: PropTypes.func,
		onProgress: PropTypes.func,
	};

	constructor(props) {
		super(props);
	}

	state = {
		value: undefined,
	};

	get type() {
		const {type} = this.props;

		switch (type) {
			case 'photo': return 'image/*';
			case 'video': return 'video/*';
			case 'audio': return 'audio/*';

			default: return '';
		}
	}

	// TODO: add ability upload multiple
	fileHandler(files) {
		if (files.length === 0) return;

		const [file] = files;
		const {
			onUploaded,
		} = this.props;

		// TODO: add validation

		this.setState({value: file}, () => onUploaded(this.state));
	};

	inputHandler = (event) => {
		event.preventDefault();
		event.stopPropagation();

		this.fileHandler(event.target.files);
		event.target.value = null;
	};

	render() {

		return (
			<div className="btn btn-primary btn-block">
				<form ref={element => this.form = element}>
					<label htmlFor="media-file">Upload file</label>
					<input
						id="media-file"
						type="file"
						name="file"
						hidden
						accept={this.type}
						onChange={this.inputHandler}
					/>
				</form>
			</div>
		);
	}
}

export default Uploader;