import React, {Component} from 'react';
import {Link} from 'react-router-dom';

import Avatar from '../../components/Avatar';
import Loading from '../../components/Loading';

class ProfileScene extends Component {
	constructor(props) {
		super(props);
	}

	state = {
		loading: true,
	};

	componentDidMount() {
		this.timeout = setTimeout(() =>
			this.setState({loading: false}), 300);
	}

	componentWillUnmount() {
		clearTimeout(this.timeout);
	}

	render() {
		const {loading} = this.state;
		const {match: {params}} = this.props;

		const bg = 'https://s3-eu-west-1.amazonaws.com/clb-staging.ie/users/585978cc85472a22002f8a1e/1498046178369.jpg';

		if (loading) {
			return <Loading />;
		}

		return (
			<div className="public-profile">
				<div className="public-profile--header">
					<div className="public-profile--user-info">
						<div className="public-profile--user-info--avatar">
							<Avatar
								size={180}
								indicator={false}
								username={'Paolo Mantini'}
								picture={'https://s3-eu-west-1.amazonaws.com/clb-production.ie/users/585978cc85472a22002f8a1e/1482262904195'}
							/>
						</div>

						<div className="public-profile--user-info--content">
							<h1 className="public-profile--user-info__name">Paolo Mantini</h1>
							<br/>
							<h3 className="public-profile--user-info__username">@paolomantini</h3>
							<br/>
							<p className="public-profile--user-info__description">Italy</p>
						</div>
					</div>
					<div className="public-profile--art-work">
						<div className="public-profile--art-work__cover" style={{backgroundImage: `url("${bg}")`}} />
					</div>
				</div>

				<div className="public-profile--wrapper">
					<div className="public-profile--bar">
						<div className="public-profile--bar__counters">
							<div className="info-stats">
								<Link to={`${params.profile}/followers`} className="info-stats--link">
									<span className="info-stats--link__text">Followers</span>
									<span className="info-stats--link__counter">1.431</span>
								</Link>
								<Link to={`${params.profile}/following`} className="info-stats--link">
									<span className="info-stats--link__text">Following</span>
									<span className="info-stats--link__counter">992</span>
								</Link>
								<Link to={`${params.profile}`} className="info-stats--link">
									<span className="info-stats--link__text">Projects</span>
									<span className="info-stats--link__counter">42</span>
								</Link>
							</div>
						</div>

						<div className="public-profile--bar__actions">
							<button type="button" className="btn btn-primary mr-2">Follow</button>
							<button type="button" className="btn btn-default">Start new Workspace</button>
						</div>
					</div>

					<div className="public-profile--content">
						<main className="public-profile--content--main">
							<ul className="module-content--list">
								<li className="module-content--list__item">
									<article className="module-embed">
										<div className="module-embed--content">
											<iframe
												width="100%"
												height="166"
												scrolling="no"
												frameBorder="no"
												src="https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/224774359&amp;color=%230f0f0f&amp;auto_play=false&amp;hide_related=false&amp;show_comments=true&amp;show_user=true&amp;show_reposts=false"
											/>
										</div>
									</article>
								</li>
							</ul>
						</main>
						<aside className="public-profile--content--aside">
							{/*<article className="module-aside">*/}
								{/*<div className="module-aside--header">*/}
									{/*<div className="module-aside--header__meta">*/}
										{/*<div className="meta">*/}
										{/*<span className="meta--item__medium">*/}
											{/*<i className="fa fa-calendar" />*/}
										{/*</span>*/}
											{/*<span className="meta--item__medium">12</span>*/}
											{/*<span className="meta--item__medium">events</span>*/}
										{/*</div>*/}
									{/*</div>*/}

									{/*<div className="module-aside--header__meta">*/}
										{/*<Link to={`${params.profile}/events`}>View all</Link>*/}
									{/*</div>*/}
								{/*</div>*/}
							{/*</article>*/}
						</aside>
					</div>
				</div>
			</div>
		);
	}

}

export default ProfileScene;