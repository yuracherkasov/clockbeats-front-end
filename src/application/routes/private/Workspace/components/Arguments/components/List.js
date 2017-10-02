import React from 'react';

// helpers
import {memoize} from 'lodash';

// Components
import Argue from './Detail';

const memoization = memoize(argue => (
	<li key={argue.id}>
		<Argue argue={argue} />
	</li>
));

function Argues({argues}) {

	return (
		<ul className="argues argues-list">
			{argues.map(argue => memoization(argue))}
		</ul>
	);
}

export default Argues;