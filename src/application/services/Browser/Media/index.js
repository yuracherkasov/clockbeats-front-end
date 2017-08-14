import 'rxjs-es/add/observable/combineLatest';
import 'rxjs-es/add/observable/fromEventPattern';
import 'rxjs-es/add/operator/debounceTime';
import 'rxjs-es/add/operator/map';

import {Observable} from 'rxjs-es/Observable';
import {mediaQueryChanged} from './aids/actions';


export const mediaQuery = {
	matches: (rules, callback) => {
		const subscription = Observable
			.combineLatest(...getMqlObservables(rules))
			.debounceTime(1)
			.map(getResults)
			.subscribe(results => callback(mediaQueryChanged(results)));

		return () => subscription.unsubscribe();
	}
};


export function em(value) {
	if (typeof value !== 'number') {
		throw new TypeError('ERROR @ em() : expected param `value` to be a number');
	}

	return value === 0 ? value : `${value / 16}em`;
}


export function getMedia(rule) {
	let media = rule.type || 'screen';

	if (rule.minWidth) media += ` and (min-width: ${em(rule.minWidth)})`;
	if (rule.maxWidth) media += ` and (max-width: ${em(rule.maxWidth)})`;
	if (rule.orientation) media += ` and (orientation: ${rule.orientation})`;

	return media;
}


export function getMqlObservables(rules) {
	return rules.map(rule => {
		const mediaQueryList = matchMedia(getMedia(rule));

		return Observable.fromEventPattern(
			handler => {
				handler(mediaQueryList);
				mediaQueryList.addListener(handler);
			},
			handler => mediaQueryList.removeListener(handler),
			mql => ({mql, rule})
		);
	});
}


export function getResults(updates) {
	return updates.reduce((acc, cur) => {
		acc[cur.rule.id] = cur.mql.matches;
		return acc;
	}, {});
}