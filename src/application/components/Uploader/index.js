import React, {Component} from 'react';
import PropTypes from 'prop-types';

import {} from 'recompose';

class Uploader extends Component {
	static propTypes = {
		onUploaded: PropTypes.func.isRequired,
	};

	constructor(props) {
		super(props);
	}

	state = {
		valid: false,
		media: undefined,
	};

	componentWillUpdate(nextState, nextProps) {
		const {onUploaded} = this.props;
	}

	// TODO: add ability upload multiple
	fileHandler = ({target}) => {
		const [file] = target.files;
		// const reader = new FileReader(file);

		console.log(file);

		this.setState({media: file});
	};

	validate() {}

	render() {

		return (
			<div className="form-group">
				<input type="file" placeholder="Chose a file" className="form-control" onChange={this.fileHandler} />
			</div>
		);
	}
}

export default Uploader;