import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import {pure} from 'recompose';

function Avatar({size, online, indicator, picture, username, editable, className, style}) {
	/** TODO: Progressive Image Loading instead "img"
	 * https://medium.com/@evenchange4/reproducing-medium-style-progressive-image-loading-for-react-2e83bba0c608
	 * */

	const wrapperClasses = classNames('avatar', className, {editable});
	const figureClasses = classNames('picture', {'opacity-transition': !picture});

	return (
		<div
			className={wrapperClasses}
			style={{...style, width: size, height: size}}
		>
			<figure className={figureClasses} title={username}>
				<img
					src={picture}
					aria-label={username}
					aria-roledescription="image"
				/>
			</figure>

			{indicator && <span className={classNames('indicator', {online, offline: !online})} title={online ? 'online' : 'offline'}/>}
		</div>
	);
}

Avatar.propTypes = {
	size: PropTypes.number,
	online: PropTypes.bool,
	indicator: PropTypes.bool,
	picture: PropTypes.string,
	username: PropTypes.string,
	editable: PropTypes.bool,
};

Avatar.defaultProps = {
	size: 50,
	online: false,
	indicator: true,
	username: 'noname',
	editable: false,
};

export default pure(Avatar);