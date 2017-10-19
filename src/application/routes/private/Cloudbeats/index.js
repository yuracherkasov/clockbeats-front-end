import React from 'react';

import Audio from '../../../components/Audio';
import Panel from '../../../components/Panel';

import Form from './components/Form';

function Main({}) {
	return (
		<ul>

		</ul>
	)
}

function Aside({}) {
	return (
		<ul>
			{[1,2,3,4,5,6].map(item => <p key={item}><Audio /></p>)}
		</ul>
	)
}

export default function Cloudbeats({}) {

	return (
		<Panel
			main={[1,2,3,4,5,6].map(item => <Audio key={item} />)}
			aside={[
				<div key="first" className="mb-2">
					<h4>Used space</h4>
					<div>
						<span>3.85 GB</span> of 50 GB
					</div>
				</div>,
				<div key="third" className="mb-3">
					<div className="progress-line">
						<div className="progress-line--fill" style={{width: '32%'}}>32%</div>
					</div>
				</div>,
				<div key="second" className="mb-3">
					<Form />
				</div>,
			]}
		/>
	);
}