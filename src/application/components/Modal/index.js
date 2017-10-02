import React from 'react';

import Portal from '../Portal';

function Overlay({children, hide}) {
	const style = {
		position: 'fixed',
		top: 0,
		left: 0,
		right: 0,
		bottom: 0,
		backgroundColor: 'rgba(96, 96, 96, 0.6)',
		zIndex: 25,
	};

	return (
		<div style={style} onClick={hide}>
			{children}
		</div>
	);
}

function Body({children}) {
	const style = {
		display: 'flex',
		backgroundColor: "#515151",
		zIndex: 30,
	};

	return (
		<div style={style}>
			{children}
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