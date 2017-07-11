import React, {Component} from 'react';
import BoilerplateHeading from './components/Boilerplate';

export default class BootstrapContainer extends Component {
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<div>
				<BoilerplateHeading />
			</div>
		);
	}
}