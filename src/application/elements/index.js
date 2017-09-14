import React from 'react';

export function Headings({}) {
	return (
		<div>
			<h1>Title 1</h1>
			<h2>Title 2</h2>
			<h3>Title 3</h3>
			<h4>Title 4</h4>
			<h5>Title 5</h5>
			<h6>Title 6</h6>
		</div>
	);
}

export function Buttons({}) {
	return (
		<div className="bordered">
			<ul>
				<li><button className="btn btn-primary">Button primary</button></li>
				<li><button className="btn btn-secondary">Button primary</button></li>
				<li>
					<button className="btn btn-icon">
						<span className="icon">
							<i className="fa fa-play fa-lg" />
						</span>
					</button>
					<button className="btn btn-icon">
						<span className="icon">
							<i className="fa fa-pause fa-lg" />
						</span>
					</button>
					<button className="btn btn-icon">
						<span className="icon">
							<i className="fa fa-step-forward fa-lg" />
						</span>
					</button>
					<button className="btn btn-icon">
						<span className="icon">
							<i className="fa fa-step-backward fa-lg" />
						</span>
					</button>
				</li>
			</ul>
		</div>
	);
}

export function Links({}) {
	return (
		<div>
			<ul>
				<li><a href="">Link</a></li>
				<li><a href="">Link</a></li>
				<li><a href="">Link</a></li>
			</ul>
		</div>
	);
}

export function Loader({}) {
	return (
		<div className="loading-indicator">
			<div className="circle circle--1" />
			<div className="circle circle--2" />
			<div className="circle circle--3" />
		</div>
	);
}