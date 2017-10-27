import React, {Component} from 'react';
import {connect} from 'react-redux';
import {createSelector} from 'reselect';
import Carousel from './components/Carousel';
import Main from './components/Main';

class HomeScene extends Component {
	constructor(props) {
		super(props);
	}

	render() {
		const {user} = this.props;
		return (
			<div>
				<Carousel />
				<Main />
			</div>
		);
	}

}

const selectUser = createSelector(
	state => state.user,
	user => {
		if (!!Object.getOwnPropertyNames(user).length) {
			return {id: user.id, name: user.name, username: user.username};
		}

		return null;
	},
);


const mapStateToProps = state => ({
	user: selectUser(state),
});

export default connect(
	mapStateToProps,
	null,
)(HomeScene);