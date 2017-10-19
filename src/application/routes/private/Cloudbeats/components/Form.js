import React, {Component} from 'react';

import Image from '../../../../components/Image';
import Input from '../../../../components/Input';
import Modal from '../../../../components/Modal';
import Uploader from '../../../../components/Uploader';

const Button = ({toggle, onFile}) => {
	const handler = (data) => {
		toggle();
		onFile(data);
	};

	return (<Uploader onUploaded={handler} />);
};

const Form = ({hide, name, onSubmit, onChange, children}) => {
	return (
		<div>
			<Input
				type="text"
				name="title"
				value={name}
				required
				validate={false}
				placeholder="Title"
				rootClasses="form-group mr-0"
				inputClasses="form-control"
				handler={onChange}
			/>

			{children}

			<div className="ml-auto mr-3 mt-3">
				<button className="btn btn-primary mr-3" onClick={onSubmit}>Upload</button>
				<button className="btn btn-default" onClick={hide}>Close</button>
			</div>
		</div>
	);
};

export default class Loader extends Component {
	constructor(props) {
		super(props);
	}

	state = {
		file: {
			valid: false,
			value: undefined,
		},
		name: {
			valid: false,
			value: undefined,
		},
	};

	fileHandler = ({value}) => {
		const {name} = value;

		this.setState({
			file: {
				valid: true,
				value,
			},
			name: {
				valid: true,
				value: name,
			},
		});
	};

	changeHandler = ({value, valid}) => {
		this.setState({name: {value, valid}});
	};

	submitHandler = () => {
		console.log(this.state);
	};

	get preview() {
		const {file: {value}} = this.state;

		if (!value) return null;

		switch (true) {
			case /image\\*/.test(value.type): {
				return <Image file={value} src="https://i1.sndcdn.com/artworks-000246612733-31pjn1-t200x200.jpg" />;
			}
			case /audio\\*/.test(value.type): {
				return <div>Audio: {value.type}</div>;
			}
			case /video\\*/.test(value.type): {
				return <div>Video: {value.type}</div>;
			}

			default: {
				return <div>Default: {value.type}</div>;
			}
		}
	}

	render() {
		const {name} = this.state;

		return (
			<Modal knob={<Button onFile={this.fileHandler} />}>
				<Form
					name={name.value}
					onSubmit={this.submitHandler}
					onChange={this.changeHandler}
				>
					{this.preview}
				</Form>
			</Modal>
		);
	}
}