import React from 'react';

import {Dropdown} from '../Dropdown';

function Audio({}) {

	return (
		<article className="article">
			<div className="article-section x-0 mr-3">
				<figure className="artwork">
					<img className="artwork__image" src="https://i1.sndcdn.com/artworks-000246612733-31pjn1-t200x200.jpg" alt="Audio artwork"/>
				</figure>
			</div>
			<div className="article-section x-3 mr-3">
				<div>
					<div className="article__title">Thelonious Monk Tribute "Mad Melodious" ft. Octavio Santos</div>
				</div>
			</div>
			<div className="article-section x-1 mr-3">
				<div className="meta">
					<span className="meta--item">uploaded in</span>
					<time className="meta--item not-muted text-medium ml-1">08/23/2017</time>
				</div>
				<ul className="icons-list">
					<li className="icons-list__icon" title="Size">
						<div className="meta">
							<span className="meta--item icon">
								<i className="fa fa-database"/>
							</span>
							<span className="meta--item">1.2MB</span>
						</div>
					</li>
					<li className="icons-list__icon" title="Extension">
						<div className="meta">
							<span className="meta--item icon">
								<i className="fa fa-file-image-o"/>
							</span>
							<span className="meta--item">JPEG</span>
						</div>
					</li>
					<li className="icons-list__icon" title="Resolution">
						<div className="meta">
							<span className="meta--item icon">
								<i className="fa fa-window-restore"/>
							</span>
							<span className="meta--item">200X200</span>
						</div>
					</li>
				</ul>
			</div>
			<div className="article-section x-0">
				<div className="ml-auto">
					<Dropdown>
						<div>Edit</div>
						<div>Remove</div>
						<div>
							<a href="https://s3-eu-west-1.amazonaws.com/clb-production.ie/users/585978cc85472a22002f8a1e/1482262904195">
								Download
							</a>
						</div>
					</Dropdown>
				</div>
			</div>
		</article>
	);
}

export default Audio;