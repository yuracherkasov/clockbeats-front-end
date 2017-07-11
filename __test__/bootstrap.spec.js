import React from 'react';
import {shallow, mount} from 'enzyme';
import renderer from 'react-test-renderer';
import Bootstrap from '../src/application/bootstrap';

describe('Bootstrap', () => {

	it('renders correctly', () => {
		const tree = renderer.create(
			<Bootstrap />
		).toJSON();

		expect(tree).toMatchSnapshot();
	});
});