import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import classNames from 'classnames';


import {memoize} from 'lodash';
import moment from 'moment';

import {
	workspaceSelector,
} from '../selectors';

import {compose, lifecycle, branch, renderComponent, withState, withStateHandlers, withHandlers, pure} from 'recompose';

import {listArgument,createArgument} from '../../../../services/Workspace';

import Loader from '../../../../components/Loading';


const Empty = ({text}) => (<div>{text}</div>);


const containerState = withStateHandlers(
	// ({argues = []}) => ({argues}),
	(props) => {
		console.log(props);

		return {argues: []};
	},
	{
		list: (props) => (argues) => ({argues}),
		push: ({argues}) => (argue) => ({argues: [argue, ...argues]}),
		pull: ({argues}) => (argueId) => ({argues: argues.filter(argue => argue.id !== argueId)}),
	}
);

const containerHandlers = withHandlers({
	fetch: ({list, workspace}) =>
		() => listArgument(workspace)
			.then(({status, data}) => list(data.argues)),

	create: ({user, push, workspace}) =>
		({body, media}) => createArgument(workspace, {issuer: user.id, body, media})
			.then(({status, data}) => push(data.argue)),
});

const containerLifecycle = lifecycle({
	state: {loading: true, error: undefined},

	componentDidMount() {
		const {fetch} = this.props;

		fetch()
			.then(() => this.setState({loading: false}))
			.catch(({status, error}) => this.setState({loading: false, error}));
	},
});

const nonOptimalStates = (states) =>
	compose(...states.map(state =>
		branch(state.when, renderComponent(state.render))));

const enhance = compose(
	containerState,
	containerHandlers,
	containerLifecycle,
	nonOptimalStates([
		{when: ({loading}) => loading, render: Loader},
		{when: ({argues}) => argues.length === 0, render: () => <Empty text="There is no arguments yet."/>},
	]),
);



const memoization = memoize((argue, pull) => (
	<li key={argue.id} className="argues-list--argue">
		<Argue argue={argue} remove={pull} />
	</li>
));

const Argues = enhance((props) => {
	const {argues, create, pull} = props;

	return (
		<div style={{flex: 1}}>
			<ArgueForm onSubmit={create} />

			<ul className="argues argues-list">
				{argues.map(argue => memoization(argue, pull))}
			</ul>
		</div>
	);
});


const ArgueForm = withStateHandlers(
	({body = '', media = undefined}) => ({body, media}),
	{
		reset: (state) => () => {
			console.log('should reset');
			console.log(state);

			return {body: '', media: undefined};
		},
		handlerInput: (state) => ({value, valid}) => ({...state, body: value}),
		handlerMedia: (state) => ({media}) => ({...state, media}),
	}
)(({body, media, handlerInput, handlerMedia, onSubmit, reset}) => {
	const submitHandler = (event) => {
		event.preventDefault();

		onSubmit({body, media});
		reset();
	};

	return (
		<div style={{display: 'flex', flexFlow: 'row nowrap', alignItems: 'center'}}>
			<div style={{flexGrow: 1}}>
				<Input handler={handlerInput} value={body} placeholder="Create argument" />
			</div>
			<button className="btn btn-icon" onClick={submitHandler}>
				<span className="icon">
					<i className="fa fa-paper-plane fa-lg" />
				</span>
			</button>
		</div>
	);
});


import {toggler} from '../../../../components/Dropdown';

const containerArgueAction = withStateHandlers();



const ArgueActionMenu = ({edit, remove}) => {

	return (
		<div className="dropdown dropdown-menu">
			<div className="dropdown--content">
				<ul>
					<li>
						<button className="btn btn-default">Edit</button>
						<button className="btn btn-default">Remove</button>
					</li>
				</ul>
			</div>
		</div>
	);
};


const ArgueActionsButton = ({argue, remove}) => {

	const handler = event => {
		event.preventDefault();

		remove(argue);
	};

	return (
		<div className="btn btn-icon" title="More" onClick={handler}>
			<div className="hamburger hamburger-dotted">
				<span />
				<span />
				<span />
			</div>
		</div>
	);
};


import {random} from 'lodash';



const Argue = pure(({argue, remove}) => {
	const {
		body,
		issuer,
		created_at,
		comments,
		likes,
		votes,
	} = argue;

	const content = body.split('\n').map((paragraph, index) => <p key={index}>{paragraph}</p>);
	const rgba = `rgba(${random(0,255)},${random(0,255)},${random(0,255)}, 1)`;


	return (
		<div className="argue argue-detail">
			<div className="argue--header">
				<div className="argue--header__author">
					<Avatar
						size={40}
						username={issuer.name}
						picture={issuer.picture}
						online={issuer.online}
						className="mr-2"
					/>
					<h4>
						<Link to={`/${issuer.username}`}>{issuer.name}</Link>
					</h4>

				</div>
				<div className="argue--header__time ml-2">
					{moment(created_at).format('hh:mm A')}
				</div>

				<div className="ml-2" style={{backgroundColor: rgba, width: 15, height: 15}} />

				<div className="argue--header__actions">
					<ArgueActionsButton argue={argue.id} remove={remove} />
				</div>
			</div>
			<div className="argue--content">
				{content}
			</div>
			<div className="argue--footer">
				{/*<div className="tags-list">*/}
					{/*<span className="tag tag-text rounded mr-1">#Lorem ipsum</span>*/}
					{/*<span className="tag tag-text rounded mr-1">#dolor sit amet</span>*/}
					{/*<span className="tag tag-text rounded mr-1">#consectetur</span>*/}
					{/*<span className="tag tag-text rounded mr-1">#adipiscing elit</span>*/}
					{/*<span className="tag tag-text rounded mr-1">#Aenean et massa</span>*/}
					{/*<span className="tag tag-text rounded mr-1">#vitae odio</span>*/}
					{/*<span className="tag tag-text rounded mr-1">#eleifend efficitur</span>*/}
					{/*<span className="tag tag-text rounded mr-1">#ut vehicula tellus</span>*/}
				{/*</div>*/}
				<ul className="icons-list ml-auto">
					<li className="icons-list__icon" title="Likes">
						<div className="meta">
							<span className="meta--item__medium icon">
								<i className="fa fa-heart" />
							</span>
							<span className="meta--item__medium">
								{likes.length}
							</span>
						</div>
					</li>
					<li className="icons-list__icon" title="Arguments">
						<div className="meta">
							<span className="meta--item__medium icon">
								<i className="fa fa-diamond" />
							</span>
							<span className="meta--item__medium">
								{votes.length}
							</span>
						</div>
					</li>
				</ul>
			</div>

			<div className="argue--addition">
				{/*<div className="comments-module" style={{width: '100%'}}>*/}
					{/*<div className="comments-module--form">*/}
						{/*<Input name='comment' handler={console.log} />*/}
					{/*</div>*/}
					{/*<CommentsList comments={comments} />*/}
				{/*</div>*/}
			</div>
		</div>
	);
});


/**
 * Create HOC Workspace Detail
 *
 * should contain logic:
 * to download all necessary data (arguments, comments, files)
 * to request more arguments on infinitive scroll
 * to filter/sorting
 * */

import {argumentCreateRequestedAction} from '../../../../services/Workspace/aids/actions';

import {Link} from 'react-router-dom';
import Avatar from '../../../../components/Avatar';

function Comment({comment}) {
	const {
		issuer,
		body,
		created_at,
	} = comment;

	return (
		<div className="comment-article">
			<div className="comment-article--header">
				<div className="comment-article--header__author">
					<Avatar
						size={40}
						username={issuer.name}
						picture={issuer.picture}
						online={issuer.online}
						className="mr-2"
					/>
					<h4>
						<Link to={`/${issuer.username}`}>{issuer.name}</Link>
					</h4>

				</div>
				<div className="comment-article--header__time ml-2">
					{moment(created_at).format('hh:mm A')}
				</div>

				<div className="comment-article--header__actions">
					<div className="btn btn-icon" title="More">
						<div className="hamburger hamburger-dotted">
							<span />
							<span />
							<span />
						</div>
					</div>
				</div>
			</div>
			<div className="comment-article--content">
				{body}
			</div>
			<div className="comment-article--footer">
				<ul className="icons-list ml-auto">
					<li className="icons-list__icon" title="Likes">
						<div className="meta">
							<span className="meta--item icon">
								<i className="fa fa-heart" />
							</span>
							<span className="meta--item">
								{Math.floor(Math.random() * 100)}
							</span>
						</div>
					</li>
					<li className="icons-list__icon" title="Arguments">
						<div className="meta">
							<span className="meta--item icon">
								<i className="fa fa-reply" />
							</span>
							<span className="meta--item">
								{Math.floor(Math.random() * 100)}
							</span>
						</div>
					</li>
				</ul>
			</div>
		</div>
	);
}

function CommentsList({comments}) {

	return (
		<ul className="comments-module--list">
			{comments.map(comment =>
				<li key={comment.id}>
					<Comment comment={comment} />
				</li>
			)}
		</ul>
	);
}

class Input extends Component {
	static propTypes = {
		name: PropTypes.string,
		handler: PropTypes.func,
		className: PropTypes.string,
	};

	static defaultProps = {
		name: 'text',
		handler: () => {},
	};

	constructor(props) {
		super(props);
	}

	state = {
		value: '',
	};

	handler = ({target}) => {
		const {handler} = this.props;
		const {value, name} = target;

		const height = value.split('\n').length > 1 ? this.textarea.scrollHeight : this.textarea.offsetHeight;

		this.setState({
			value,
			height: value ? height : 0,
		});

		handler({value, name});
	};

	render() {
		const {
			name,
			className,
			placeholder,
		} = this.props;

		const classes = classNames('input-control', className);

		const style = {
			width: '100%',
			height: this.state.height || 48,
			padding: 5,
			lineHeight: '1.42857',
			resize: 'none',
			overflow: 'hidden',
			backgroundColor: '#141414',
			color: '#eee',
			border: 'none',
		};

		return (
			<div className="input-group">
				<textarea
					ref={node => this.textarea = node}

					id={`textarea-${name}`}
					name={name}
					className={classes}
					onChange={this.handler}
					style={style}
					placeholder={placeholder || "Leave your comment"}
				/>
			</div>
		);
	}
}

function Panel({head, main, aside, footer}) {
	return (
		<div className="panel">
			<div className="panel-head"/>
			<div className="panel-module">
				<section className="panel-module--main">
					{main}
				</section>
				<aside className="panel-module--aside">
					{aside}
				</aside>
			</div>
			<div className="panel-footer"/>
		</div>
	);
}

Panel.propTypes = {
	head: PropTypes.node,
	main: PropTypes.node,
	aside: PropTypes.node,
	footer: PropTypes.node,
};

class WorkspaceDetail extends Component {
	static propTypes = {
		user: PropTypes.object.isRequired,
		workspace: PropTypes.object.isRequired,
	};

	constructor(props) {
		super(props);
	}

	renderWorkspaceInfo() {
		const {workspace: {
			archived,
			created_at,
			creator,
			description,
			ends_at,
			participants,
			starts_at,
			title,
		}} = this.props;


		return (
			<div>
				<h1>{title}</h1>
				<p>{description}</p>
			</div>
		);
	}

	render() {
		const {
			user,
			match: {params: {workspace}}
		} = this.props;

		return(
			<div className="workspace-argues">
				<Panel
					main={<Argues user={user} workspace={workspace} />}
					aside={this.renderWorkspaceInfo()}
				/>
			</div>
		);
	}
}

const mapStateToProps = (state, ownProps) => ({
	user: state.user,
	workspace: workspaceSelector(state, ownProps),
});

const mapDispatchToProps = dispatch => ({
	postArgue: ({issuer, body, media, workspace}) => dispatch(argumentCreateRequestedAction({issuer, body, media, workspace})),
});

export default connect(
	mapStateToProps,
	mapDispatchToProps,
)(WorkspaceDetail);