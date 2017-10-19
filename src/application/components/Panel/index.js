import React, {Children, cloneElement} from 'react';

import PropTypes from 'prop-types';
import {memoize} from 'lodash';

const memoization = memoize((element) => cloneElement(element));

const Head = ({head}) => {
	if (!head) return null;

	return (
		<div className="panel-header">
			{head}
		</div>
	);
};

const Footer = ({footer}) => {
	if (!footer) return null;

	return (
		<div className="panel-footer">
			{footer}
		</div>
	);
};


function Panel({head, main, aside, footer}) {

	return (
		<div className="panel">
			<Head head={head} />
			<div className="panel-content">
				<section className="panel-content--main">
					{Children.map(main, element => memoization(element))}
				</section>
				<aside className="panel-content--aside">
					{Children.map(aside, element => memoization(element))}
				</aside>
			</div>
			<Footer footer={footer} />
		</div>
	);
}

Panel.propTypes = {
	head: PropTypes.node,
	main: PropTypes.node,
	aside: PropTypes.node,
	footer: PropTypes.node,
};

export default Panel;