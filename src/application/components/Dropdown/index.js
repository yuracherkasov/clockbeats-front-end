import React, {Children, cloneElement} from 'react';
import Portal from '../Portal';

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

const Menu = ({children, hide, knobPosition: {top, left, width, height}}) => {
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
};

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