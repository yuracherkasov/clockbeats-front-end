import React, {
	Children,
	Component,
	cloneElement,
} from 'react';

import {
	findDOMNode,
	createPortal,
} from 'react-dom';

import PropTypes from 'prop-types';

import {compose, toClass, branch, renderNothing} from 'recompose';

export const DumbPortal = compose(
	toClass,
	branch(({open}) => !open, renderNothing),
)(({children, container}) =>
	createPortal(children, container));

DumbPortal.propTypes = {
	children: PropTypes.node.isRequired,
	container: PropTypes.objectOf(HTMLElement),
	open: PropTypes.bool,
};

DumbPortal.defaultProps = {
	container: document.querySelector('.portal-container'),
	open: true,
};

const KEYCODES = {
	ESCAPE: 27,
};

export default class Portal extends Component {
	static propTypes = {
		children: PropTypes.oneOfType([
			PropTypes.node,
			PropTypes.arrayOf(PropTypes.node)
		]).isRequired,
		knob: PropTypes.node.isRequired,
	};

	static defaultProps = {};

	constructor(props) {
		super(props);
	}

	state = {
		active: false,
		position: {
			top: 0,
			left: 0,
		}
	};

	componentDidUpdate() {
		const {active} = this.state;

		if (!active) {
			this.disableHandlers();
		} else {
			this.enableHandlers();
		}
	}

	componentWillUnmount() {
		this.disableHandlers();
	}

	enableHandlers = () => {
		document.addEventListener('keydown', this.handleKeydown);
		document.addEventListener('mouseup', this.handlePressOutside);
	};

	disableHandlers = () => {
		document.removeEventListener('keydown', this.handleKeydown);
		document.removeEventListener('mouseup', this.handlePressOutside);
	};


	handleKeydown = (event) => {
		const {active} = this.state;

		if (event.keyCode === KEYCODES.ESCAPE && active) {
			this.hide();
		}
	};

	handlePressOutside = (event) => {
		const {active} = this.state;
		const portal = findDOMNode(this.portal);

		if (!active) {
			return;
		}

		if (portal.contains(event.target)) {
			return;
		}

		event.preventDefault();
		event.stopPropagation();
		const knobNode = event.target.closest('.knob');

		if (knobNode !== this.node) {
			this.hide();
		}
	};

	show = () => {
		this.setState({active: true, position: this.knobPosition});
	};

	hide = () => {
		this.setState({active: false, position: this.knobPosition});
	};

	toggle = () => {
		this.setState(state => ({active: !state.active, position: this.knobPosition}));
	};

	get knobPosition() {
		if (this.node) {
			const {top, left, width, height} = this.node.getBoundingClientRect();

			return {top, left, width, height};
		}
	}

	get child() {
		const {position} = this.state;
		const {children} = this.props;
		const props = {
			hide: this.hide,
			knobPosition: position,
		};

		return Children.map(children, (element) => cloneElement(element, props));
	}

	get trigger() {
		const {knob} = this.props;
		const props = {
			toggle: this.toggle,
		};

		return cloneElement(knob, props);
	}


	render() {
		const {active} = this.state;

		return (
			<div ref={element => this.node = element} className="knob">
				{this.trigger}

				<DumbPortal ref={element => this.portal = element} open={active}>
					{this.child}
				</DumbPortal>
			</div>
		);
	}
}