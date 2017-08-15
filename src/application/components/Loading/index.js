import React from 'react';

function LoadingIndicator() {
	return (
		<div className="h-100 d-flex align-items-center justify-content-center">
			<div className="loading-indicator">
				<div className="circle circle--1" />
				<div className="circle circle--2" />
				<div className="circle circle--3" />
			</div>
		</div>
	);
}

export default LoadingIndicator;