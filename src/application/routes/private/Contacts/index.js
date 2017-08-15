import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';

const CONTACTS = [
	{
		name: 'Paolo Mantini',
		username: 'paolomantini',
		online: true,
		summary: 'DJs, Music Business Management, Performers, Writers, Composers, Record Labels, Audio Engineers, Sound designers',
	},
	{
		name: 'Alex Poliakov',
		username: 'poliakov',
		online: false,
		summary: 'Awesome guy. No info available for this user',
	},
	{
		name: 'Dario Oliva',
		username: 'olivadario',
		online: true,
		summary: 'General Manager in Clockbeats Studio Brescia',
	},
	{
		name: 'Lorenzo Ceruti',
		username: 'XER',
		online: false,
		summary: '',
	},
	{
		name: 'Ogopogo Records',
		username: 'ogopogorecords',
		online: true,
		summary: 'Ogopogo is a record label founded on the conception of music and life as one single entity.',
	},
	{
		name: 'We Need Cracks',
		username: 'weneedcracks',
		online: true,
		summary: 'Activiste depuis maintenant quelques années, le duo We Need Cracks ( aka W.N.C.) distille une techno mélodique, groovy et envoutante tout à fait à leur style.',
	},
	{
		name: 'Marcin Jakubik',
		username: 'marcinjak9',
		online: true,
		summary: 'Nerd since 1994',
	},
];

class ContactsContainer extends Component {
	constructor(props) {
		super(props);
	}

	render() {

		return (
			<div>
				<div className="pt-3">
					<div className="container">
						<div className="wide-search panel">
							<div className="form-group">
								<input type="text" className="form-control form-control-lg" placeholder="Search Contacts" />
							</div>
						</div>
					</div>
				</div>

				<div className="contacts panel">
					<div className="container">
						<div className="contacts-wrapper">
							<ul className="contacts-list">
								{
									CONTACTS.map((contact, index) => {

										return (
											<li key={index} className="item">

												<div className="d-flex flex-row align-items-center justify-content-around macro macro-profile">
													<figure className="w-25 mr-3 macro-avatar">
														<img src="https://semantic-ui.com/images/wireframe/square-image.png" alt="Avatar" />
													</figure>
													<div className="w-50">
														<h2 className="h1 m-0 macro-username">
															<Link to={`/${contact.username}`} >{contact.name} {contact.online ? <small className="text-success font-weight-normal">online</small> : <small className="text-muted font-weight-normal">offline</small>}</Link>
														</h2>
														<p className="m-0 macro-description">{contact.summary}</p>
													</div>
													<div className="w-25 ml-5">
														<span className="ml-2">
															<i className="fa fa-comments-o fa-fw"/>
														</span>
														<span className="ml-2">
															<i className="fa fa-suitcase fa-fw"/>
														</span>
													</div>

													<div className="align-self-baseline">
														<button type="button" className="fa-fw close" aria-label="Close">
															<span aria-hidden="true">&times;</span>
														</button>
													</div>
												</div>
											</li>
										);
									})
								}
							</ul>
						</div>
					</div>
				</div>
			</div>
		);
	}
}

export default connect()(ContactsContainer);