import React, {Component} from 'react';

class Anchor extends Component {

	render() {

		return (
			<div className="anchor">
				<button className="btn btn-icon">
					<span className="icon">
						<i className="fa fa-arrow-down fa-lg" />
					</span>
				</button>
			</div>
		);
	}
}

export default Anchor;