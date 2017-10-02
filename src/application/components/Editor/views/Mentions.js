import React from 'react';
import {CompositeDecorator, Editor, EditorState} from 'draft-js';


import {compose, withStateHandlers} from 'recompose';





const containerEditorState = withStateHandlers(
	({editor = EditorState.createEmpty()}) => ({editor}),
	{
		handler: (editor) => (updated) => ({editor: updated}),
		clear: (editor) => () => ({editor: EditorState.createEmpty()}),
	}
);

function Mentions({editor, handler, clear, submit = () => {}}) {

	const onSubmit = (event) => {
		event.preventDefault();
		const value = editor.getCurrentContent().getPlainText();

		console.log(JSON.stringify(value));
		submit({body: JSON.stringify(value)});
		clear();
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
		<div style={{display: 'flex', alignItems: 'flex-end', width: 650, margin: '0 auto', marginTop: 25,}}>
			<button className="btn btn-icon" onClick={onAttach}>
				<span className="icon">
					<i className="fa fa-paperclip fa-2x" />
				</span>
			</button>
			<div style={style} className="ml-2 mr-2">
				<Editor
					editorState={editor}
					onChange={handler}
					placeholder="Type something"
				/>
			</div>
			<button className="btn btn-icon" onClick={onSubmit}>
				<span className="icon">
					<i className="fa fa-paper-plane fa-lg" />
				</span>
			</button>
		</div>
	);
}

export default containerEditorState(Mentions);