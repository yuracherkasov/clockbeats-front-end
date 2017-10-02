import React, {Component} from 'react';
import {Link} from 'react-router-dom';

import {pure} from 'recompose';
import classNames from 'classnames';


// TODO: add "show more/less" if body/media content more then 75px
function ArgumentAside({item}) {
	const {
		body,
		media,
	} = item;

	return (
		<div className="argument argument-tiny">
			<div className="argument--header">
				<Link to="/eggcllent" className="argument--header__author">Stewie Brown</Link>
				<span className="argument--header__text">on project</span>
				<Link to="/you/workspace/projectID" className="argument--header__project">Just for fun</Link>
				<time className="argument--header__time">3 hours ago</time>
			</div>
			<div className="argument--content">
				<Truncate>
					{body && (<p>{body}</p>)}
					{media && (
						<figure>
							<img src={media.img} alt="Argument media" />
						</figure>
					)}
				</Truncate>
			</div>
			<div className="argument--meta">
				<div className="meta">
					<span className="meta--item__medium">
						<i className="fa fa-comment" />
					</span>
					<span className="meta--item__medium">64</span>
				</div>
				<div className="meta">
					<span className="meta--item__medium">
						<i className="fa fa-heart" />
					</span>
					<span className="meta--item__medium">12</span>
				</div>
			</div>
		</div>
	);
}

class Truncate extends Component {
	constructor(props) {
		super(props);
	}

	state = {
		toggledOn: false,
		truncate: false,
	};

	componentDidMount() {
		const {scrollHeight} = this.node;

		// TODO: should depends on css properties
		// const style = window.getComputedStyle(this.node);
		// remove bind 85
		if (scrollHeight > 85) {
			this.setState({truncate: true});
		}
	}

	toggle = (event) => {
		event.preventDefault();
		this.setState(state => ({toggledOn: !state.toggledOn}));
	};


	render() {
		const {truncate, toggledOn} = this.state;
		const {children} = this.props;
		const classes = classNames('truncate', {'truncate__collapsed': !toggledOn && truncate});

		return (
			<div>
				<div ref={node => this.node = node} className={classes}>
					{children}
				</div>

				{truncate && (
					<button className="btn btn-default btn-sm mt-1" onClick={this.toggle}>
						Show {toggledOn ? 'less' : 'more'}
					</button>
				)}

			</div>
		);
	}
}

export const Argument = pure(ArgumentAside);