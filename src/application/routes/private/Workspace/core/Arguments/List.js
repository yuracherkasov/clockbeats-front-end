import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';

import {
	branch,
	compose,
	lifecycle,
	withHandlers,
	withStateHandlers,
	renderComponent,
} from 'recompose';

import {
	listArgument,
	createArgument,
	updateArgument,
	deleteArgument,
	reactArgument,
} from '../../../../../services/Workspace';

import Argue from './Detail';
import Loading from '../../../../../components/Loading';

import moment from 'moment';
import {memoize, findIndex} from 'lodash';

function mapUserToArgue(users, argues) {
	return argues.map(argue => {
		let issuer;

		if (typeof argue.issuer === 'object') {
			issuer = users.find(user => user.id === argue.issuer.id);
		} else {
			issuer = users.find(user => user.id === argue.issuer);
		}

		return {
			...argue,
			issuer,
		};
	});
}

const arguesState = withStateHandlers(
	({argues = []}) => ({argues}),
	{
		list: (state, {users}) => (argues) => ({argues: mapUserToArgue(users, argues)}),
		push: ({argues}, {users}) => (argue) => ({argues: mapUserToArgue(users, [argue, ...argues])}),
		pull: ({argues}) => (argueId) => ({argues: argues.filter(argue => argue.id !== argueId)}),
		replace: ({argues}, {users}) => (argue) => {
			const index = findIndex(argues, a => a.id === argue.id);
			const result = [
				...argues.slice(0, index),
				{
					...argue,
					issuer: users.find(user => user.id === argue.issuer),
				},
				...argues.slice(index + 1),
			];

			return {argues: result};
		},
	}
);

const arguesHandlers = withHandlers({
	fetch: ({workspace, list}) =>
		() => listArgument(workspace)
			.then(({status, data}) => list(data.argues)),

	create: ({workspace, user, push}) =>
		({body, media}) => createArgument(workspace, {issuer: user.id, body, media})
			.then(({status, data}) => push(data.argue)),

	update: ({workspace, replace}) =>
		(argue) => updateArgument(workspace, argue.id, argue)
			.then(({status, data}) => replace(data.argue)),

	remove: ({workspace, pull}) =>
		(argueId) => deleteArgument(workspace, argueId)
			.then(({status, data}) => pull(data.argue.id)),

	react: ({workspace, user, replace}) =>
		(argue, {type, value}) => reactArgument(workspace, argue, {issuer: user.id, type, value})
			.then(({status, data}) => replace(data.argue)),
});

const arguesLifecycle = lifecycle({
	state: {
		error: undefined,
		loading: true,
	},

	componentDidMount() {
		const {fetch} = this.props;

		fetch()
			.then(({status, error}) => this.setState({loading: false, error}))
			.catch(({status, error}) => this.setState({loading: false, error}));
	},
});

const enhance = compose(
	arguesState,
	arguesHandlers,
	arguesLifecycle,
	branch(
		({loading}) => loading,
		renderComponent(Loading),
	),
);

function EmptyList() {
	return (
		<div className="empty-list">
			<p className="empty-list--message">There are no arguments</p>
		</div>
	);
}


import 'rxjs-es/add/observable/fromEvent';
import 'rxjs-es/add/operator/debounceTime';
import 'rxjs-es/add/operator/let';
import 'rxjs-es/add/operator/map';
import 'rxjs-es/add/operator/publish';

import { Observable } from 'rxjs-es/Observable';

function scrollData(element) {
	return Observable
		.fromEvent(element, 'scroll')
		.debounceTime(100)
		.let(getScrollData())
		.publish()
		.refCount();
}



function getScrollData() {
	return event$ => event$
		.map(event => {
			const {
				scrollHeight,
				scrollTop,
				offsetTop,
				offsetHeight,
				clientHeight,
			} = event.target;

			return {
				scrollTop,
				scrollHeight,
				offsetTop,
				offsetHeight,
				clientHeight,
			};
		});
}

import {DumbPortal} from '../../../../../components/Portal';
import classNames from 'classnames';

class Anchor extends Component {
	state = {
		scroll: {
			scrollTop: 0,
			scrollHeight: 0,
			offsetTop: 0,
			offsetHeight: 0,
			clientHeight: 0,
		},

		back: 0,
	};

	componentDidMount() {
		const wrapper = document.querySelector('.content--wrapper');

		this.unsubscribeScrollData = scrollData(wrapper)
			.subscribe(data => this.setState({scroll: data}));
	}

	componentWillUnmount() {
		this.unsubscribeScrollData.unsubscribe();
	}

	handlerAnchor = () => {
		const {scroll, back} = this.state;
		const wrapper = document.querySelector('.content--wrapper');

		if (scroll.scrollTop === 0) {
			wrapper.scrollTop = back;
		} else {
			wrapper.scrollTop = 0;
			this.setState({back: scroll.scrollTop});
		}
	};

	button = () => {
		const {scroll, back} = this.state;
		const iconClass = classNames(
			'fa fa-lg',
			{
				'fa-arrow-down': scroll.scrollTop === 0,
				'fa-arrow-up': scroll.scrollTop !== 0,
			});
		const buttonClass = classNames(
			'btn btn-icon slide',
			{
				'slide-up': this.node && !(scroll.scrollTop === 0 && back === 0),
			});

		const getStyle = () => {
			if (!this.node) return undefined;

			const {width, left} = this.node.getBoundingClientRect();

			return {left: (width / 2) + left};
		};

		return (
			<div className="anchor" style={getStyle()}>
				<button className={buttonClass} onClick={this.handlerAnchor}>
					<span className="icon">
						<i className={iconClass} />
					</span>
				</button>
			</div>
		);
	};


	render() {
		const {children} = this.props;

		return (
			<div ref={node => this.node = node}>
				{children}
				<DumbPortal>
					{this.button()}
				</DumbPortal>
			</div>
		);
	}
}


const DateSeparator = ({prev, next}) => {
	if (!next || moment(next).isSame(prev, 'day')) return null;

	return (
		<div className="date-separator">
			<span className="date-separator__text">{moment(next).format('MMMM DD')}</span>
		</div>
	);
};



import {Editor, EditorState, ContentState} from 'draft-js';

const containerEditorState = withStateHandlers(
	({initial, editor}) => {
		if (initial) {
			const content = ContentState.createFromText(initial);
			editor = EditorState.createWithContent(content);
		} else {
			editor = EditorState.createEmpty();
		}

		return {editor};
	},
	{
		handler: (editor) => (updated) => ({editor: updated}),
		clear: (editor) => () => ({editor: EditorState.createEmpty()}),
	}
);

function Mentions({initial, editor, handler, clear, submit = () => {}, cancel = () => {}}) {

	const onSubmit = (event) => {
		event.preventDefault();
		const value = editor.getCurrentContent().getPlainText();

		if (value) {
			submit({body: value});
			clear();
		}
	};

	const onCancel = (event) => {
		event.preventDefault();
		cancel(event);
	};

	const onAttach = (event) => {
		event.preventDefault();
	};

	const style = {
		width: '100%',
		padding: 7,
		lineHeight: '1.42857',
		backgroundColor: '#141414',
		color: '#eee',
		border: 'none',
		cursor: 'text',
	};

	return (
		<div>
			<div style={style}>
				<Editor
					editorState={editor}
					onChange={handler}
					placeholder="Your argument..."
				/>
			</div>
			<div style={{display: 'flex', margin: '10px 0 20px'}}>
				{/*<button className="btn btn-icon" onClick={onAttach}>*/}
					{/*<span className="icon">*/}
						{/*<i className="fa fa-paperclip fa-2x" />*/}
					{/*</span>*/}
				{/*</button>*/}
				<button className="btn btn-primary btn-sm ml-auto" onClick={onSubmit}>Create</button>
				{/*<button className="btn btn-default btn-sm ml-1" onClick={onCancel}>Cancel</button>*/}
			</div>
		</div>
	);
}

const TextEditor = containerEditorState(Mentions);


function Argues(props) {
	const {
		user,
		argues,
		create,
		update,
		remove,
		react,
	} = props;

	return (
		<div style={{flex: 1}}>
			<Anchor>
				<TextEditor submit={create} />

				{!(!!argues.length) && (
					<EmptyList />
				)}

				<ul className="argues argues-list">
					{argues.map((argue, index, array) => (
						<li key={argue.id} className="argues-list--argue">
							<Argue
								user={user}
								argue={argue}
								remove={remove}
								edit={update}
								react={react}
							/>
						</li>
					))}
				</ul>
			</Anchor>
		</div>
	);
}

Argues.propTypes = {
	workspace: PropTypes.string.isRequired,
};

import {onlineSelector} from '../../../Chat/selectors';

const mapStateToProps = (state) => ({
	user: state.user,
	users: onlineSelector(state),
	online: state.socket.online,
});

export default connect(
	mapStateToProps,
)(enhance(Argues));