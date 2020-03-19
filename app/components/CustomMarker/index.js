/**
 *
 * CustomMarker
 *
 */

import React, { memo } from 'react';
import PropTypes from 'prop-types';
// import styled from 'styled-components';
import { Marker, Popup } from 'react-leaflet';

// import { FormattedMessage } from 'react-intl';
// import messages from './messages';

function CustomMarker({
	latlng,
	getPlaceReverse,
	initialPosition,
	display_name,
}) {
	const onDragendHandler = value => {
		const { _latlng } = value.target;
		getPlaceReverse(_latlng);
	};
	return (
		<Marker
			position={latlng}
			penTO
			// onFlyTo={{ latlng, zoom: 20 }}
			draggable
			onDragend={onDragendHandler}
		>
			<Popup>{display_name}</Popup>
		</Marker>
	);
}

CustomMarker.propTypes = {
	latlng: PropTypes.object,
	initialPosition: PropTypes.object,
	getPlaceReverse: PropTypes.func,
	display_name: PropTypes.string,
};

export default memo(CustomMarker);
