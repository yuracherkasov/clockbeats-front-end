import React from 'react';
import {Route, Switch} from 'react-router-dom';

import YouScene from './private/You';
import HomeScene from './public/Home';
import IntroScene from './public/Intro';
import TermsScene from './public/Terms';
import ProfileScene from './public/Profile';
import SignScene from './public/Sign/Sign';
import RestoreScene from './public/Sign/Restore';

export default function Routing({}) {
	return (
		<Switch>
			<Route exact path="/" component={HomeScene} />
			<Route path="/intro" component={IntroScene} />
			<Route path="/terms" component={TermsScene} />
			<Route path="/sign-in" component={SignScene} />
			<Route path="/sign-up" component={SignScene} />
			<Route path="/restore" component={RestoreScene} />

			{/* Private routes */}
			<Route path="/you" component={YouScene} />

			{/* Dynamic router for public profile */}
			<Route exact path="/:profile" component={ProfileScene} />
		</Switch>
	);
}
