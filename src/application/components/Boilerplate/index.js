import React from 'react';

export default function BoilerplateHeading({}) {
	return (
		<div className="container-fluid head">
			<header className="boilerplate-heading">
				<div className="row align-items-center">
					<div className="col-md-3">
						<figure className="logo-image">
							<img src="/assets/images/eggcllnt-head.gif" alt="Eggcllnt greeting" />
						</figure>
					</div>
					<div className="col-md-9">
						<h1 className="align-self-center">Hello, world</h1>
						<p>Make things better with React</p>
					</div>
				</div>
			</header>
		</div>
	);
}