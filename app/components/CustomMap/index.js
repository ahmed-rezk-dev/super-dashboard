/**
 *
 * CustomMap
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Map, TileLayer } from 'react-leaflet';
import CustomMarker from 'components/CustomMarker';
// import { FormattedMessage } from 'react-intl';
// import messages from './messages';
export const MapStyle = styled(Map)`
	width: 100%;
	height: 500px;
`;

function CustomMap({ mapData, getPlaceReverse, mapRef }) {
	const {
		currentAddress: { lat, lon, display_name },
		initialPosition,
	} = mapData;

	const latlng = {
		lat,
		lon,
	};

	// Location found Handler
	const onLocationfoundHandler = value => {
		getPlaceReverse(value.latlng);
	};
	return (
		<MapStyle
			center={[lat, lon]}
			zoom={20}
			animate
			onLocationfound={onLocationfoundHandler}
			ref={mapRef}
		>
			<TileLayer
				url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
				attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
			/>
			{/* Custom Marker */}
			<CustomMarker
				latlng={latlng}
				initialPosition={initialPosition}
				getPlaceReverse={getPlaceReverse}
				display_name={display_name}
			/>
		</MapStyle>
	);
}

CustomMap.propTypes = {
	mapData: PropTypes.object,
	getPlaceReverse: PropTypes.func,
	mapRef: PropTypes.object,
};

export default CustomMap;
