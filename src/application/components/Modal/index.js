import React, {
	Children,
	Component,
	cloneElement,
} from 'react';

import {memoize} from 'lodash';
import PropTypes from 'prop-types';

import Portal from '../Portal';

const memoization = memoize((props, element) => cloneElement(element, props));

class Overlay extends Component {
	static propTypes = {
		children: PropTypes.objectOf(Body).isRequired,
	};

	constructor(props) {
		super(props);
	}

	handleClose = (event) => {
		const {hide} = this.props;

		if (this.overlay === event.target) {
			hide();
		}
	};

	get child() {
		const {children, hide} = this.props;

		return cloneElement(children, {hide});
	}

	render() {
		return (
			<div
				ref={element => this.overlay = element}
				className="modal__overlay"
				onClick={this.handleClose}
			>
				{this.child}
			</div>
		);
	}
}


function Body({children, hide}) {
	return (
		<div className="modal__content">
			{Children.map(children, element => memoization({hide}, element))}
		</div>
	);
}

export default function Modal({children, knob}) {

	return (
		<Portal knob={knob}>
			<Overlay>
				<Body>
					{children}
				</Body>
			</Overlay>
		</Portal>
	);
}