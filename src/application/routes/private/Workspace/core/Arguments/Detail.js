import React from 'react';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';
import classNames from 'classnames';


import {pure, compose} from 'recompose';
import {random, memoize} from 'lodash';
import moment from 'moment';

import Avatar from '../../../../../components/Avatar';
import {Dropdown} from '../../../../../components/Dropdown';

{/*<div className="comments-module" style={{width: '100%'}}>*/}
{/*<div className="comments-module--form">*/}
{/*<Input name='comment' handler={console.log} />*/}
{/*</div>*/}
{/*<CommentsList comments={comments} />*/}
{/*</div>*/}

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

import {
	withStateHandlers,
} from 'recompose';

const argueEditableState = withStateHandlers(
	({editing = false}) => ({editing}),
	{toggleEditing: ({editing}) => () => ({editing: !editing})},
);

function ColoredSquare() {
	const rgba = `rgba(${random(0,255)},${random(0,255)},${random(0,255)}, 1)`;

	return (
		<div
			className="ml-2"
			style={{backgroundColor: rgba, width: 15, height: 15}}
		/>
	);
}


function ReactButton({size, title, icon, value, onClick, reactive, reacted}) {
	const mainClasses = classNames('meta', {reacted, reactive});
	const iconSizeClasses = classNames(
		{icon},
		{'meta--item': (!size || size === 'sm')},
		{'meta--item__medium': (size === 'md')},
	);
	const counterSizesClasses = classNames(
		{'meta--item': (!size || size === 'sm')},
		{'meta--item__medium': (size === 'md')},
	);

	return (
		<div className={mainClasses} onClick={onClick} title={title}>
			<span className={iconSizeClasses}>
				<i className={`fa fa-${icon}`} />
			</span>
			<span className={counterSizesClasses}>
				{value}
			</span>
		</div>
	);
}

ReactButton.propTypes = {
	size: PropTypes.oneOf(['sm', 'md']),
	title: PropTypes.string,
	icon: PropTypes.string.isRequired,
	value: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
	onClick: PropTypes.func,
	reacted: PropTypes.bool,
	reactive: PropTypes.bool,
};

/* MEMOIZE BODY */
import {uuid} from '../../../../../utils/uuid';

function Body({text}) {
	const paragraphs = text.split('\n');

	return paragraphs.map((paragraph, index) => <p key={uuid()} style={{minHeight: 19}}>{paragraph}</p>);
}

function Argue({argue, user, edit, remove, react, editing, toggleEditing}) {
	const {
		issuer,
		body,
		likes,
		votes,
		created_at,
	} = argue;
	const creator = (issuer.id === user.id);
	const isLiked = likes.some(uid => uid === user.id);
	const isVoted = votes.some(uid => uid === user.id);

	const like = (event) => {
		event.preventDefault();
		return react(argue.id, {type: 'like', value: isLiked ? -1 : 1});
	};

	const vote = (event) => {
		event.preventDefault();
		return react(argue.id, {type: 'vote', value: isVoted ? -1 : 1});
	};

	const onUpdate = ({body, media}) => {
		edit({...argue, body, media});
		toggleEditing();
	};

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
					<span style={{display: 'block', paddingTop: 2}}>{moment(created_at).format('MMMM DD | hh:mm A')}</span>
				</div>

				{creator && (
					<div className="argue--header__actions">
						<Dropdown>
							<div onClick={toggleEditing}>Edit</div>
							<div onClick={() => remove(argue.id)}>Remove</div>
						</Dropdown>
					</div>
				)}
			</div>
			<div className="argue--content">
				{editing && <TextEditor initial={body} submit={onUpdate} cancel={toggleEditing} />}
				{!editing && <Body text={body} />}
			</div>
			<div className="argue--footer">
				<ul className="icons-list ml-auto">
					<li className="icons-list__icon" title="Likes">
						<ReactButton
							icon="heart"
							size="md"
							title="Likes"
							value={likes.length}
							onClick={like}
							reactive
							reacted={isLiked}
						/>
					</li>
					<li className="icons-list__icon" >
						<ReactButton
							icon="diamond"
							size="md"
							title="Diamonds"
							value={votes.length}
							onClick={vote}
							reactive
							reacted={isVoted}
						/>
					</li>
				</ul>
			</div>
			<div className="argue--addition">
				{/* COMMENTS HERE! */}
			</div>
		</div>
	);
}

Argue.propTypes = {
	argue: PropTypes.object.isRequired,
	user: PropTypes.object.isRequired,
	edit: PropTypes.func.isRequired,
	remove: PropTypes.func.isRequired,
	react: PropTypes.func.isRequired,
	editing: PropTypes.bool.isRequired,
	toggleEditing: PropTypes.func.isRequired,
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
		submit({body: value});
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
		minHeight: 40,
		padding: 7,
		lineHeight: '1.42857',
		backgroundColor: '#141414',
		color: '#eee',
		border: 'none',
		cursor: 'text',
	};

	return (
		<div style={{display: 'flex'}}>
			<div style={style}>
				<Editor
					editorState={editor}
					onChange={handler}
					placeholder="Type something"
				/>
			</div>

			<button className="btn btn-icon mr-auto" onClick={onAttach}>
				<span className="icon">
					<i className="fa fa-paperclip fa-2x" />
				</span>
			</button>
			<div className="ml-auto">
				<button className="btn btn-primary" onClick={onSubmit}>Update</button>
				<button className="btn btn-default" onClick={onCancel}>Cancel</button>
			</div>
		</div>
	);
}

const TextEditor = containerEditorState(Mentions);

export default compose(
	argueEditableState,
	pure,
)(Argue);



