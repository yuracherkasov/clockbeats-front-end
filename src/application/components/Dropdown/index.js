import React, {Children, cloneElement} from 'react';
import Portal from '../Portal';

import {lifecycle} from 'recompose';

const keys = {37: 1, 38: 1, 39: 1, 40: 1};

function preventDefault(e) {
	e = e || window.event;
	if (e.preventDefault)
		e.preventDefault();
	e.returnValue = false;
}

function preventDefaultForScrollKeys(e) {
	if (keys[e.keyCode]) {
		preventDefault(e);
		return false;
	}
}

function disableScroll() {
	if (window.addEventListener) {
		window.addEventListener('DOMMouseScroll', preventDefault, false);
	}

	window.onwheel = preventDefault;
	window.onmousewheel = document.onmousewheel = preventDefault;
	window.ontouchmove = preventDefault;
	document.onkeydown = preventDefaultForScrollKeys;
}

function enableScroll() {
	if (window.removeEventListener) {
		window.removeEventListener('DOMMouseScroll', preventDefault, false);
	}

	window.onmousewheel = document.onmousewheel = null;
	window.onwheel = null;
	window.ontouchmove = null;
	document.onkeydown = null;
}

const Button = ({toggle}) => {
	return (
		<div className="btn btn-icon" onClick={toggle}>
			<div className="hamburger hamburger-dotted">
				<span />
				<span />
				<span />
			</div>
		</div>
	);
};

const enhance = lifecycle({
	componentDidMount() {
		disableScroll();
	},

	componentWillUnmount() {
		enableScroll();
	},
});

const Menu = enhance(({children, hide, knobPosition: {top, left, width, height}}) => {
	const style = {
		position: 'absolute',
		top: top + height,
		// TODO: should calculate dynamically
		left: left - 160 + width,
		zIndex: 25,
	};

	const childes = Children.map(children, ((element, index) =>
		cloneElement(element, {className: "dropdown--menu__item"})));

	return (
		<div className="dropdown--menu" style={style} onClick={hide}>
			{childes}
		</div>
	);
});

export const Dropdown = ({children}) => {

	return (
		<div className="dropdown">
			<Portal knob={<Button />}>
				<Menu>
					{children}
				</Menu>
			</Portal>
		</div>
	);
};