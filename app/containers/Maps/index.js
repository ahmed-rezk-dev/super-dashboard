import React, { memo, useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { Map, TileLayer } from 'react-leaflet';
import styled from 'styled-components';
import CustomMarker from 'components/CustomMarker';
import PlacesAutoComplete from 'components/PlacesAutoComplete';
import MapForm from 'components/MapForm';
import makeSelectMap from './selectors';
import reducer from './reducer';
import saga from './saga';
import {
	getPlaceAction,
	getPlaceReverseAction,
	getPlaceLoadingAction,
} from './actions';

// #region Styles
export const MainContianer = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
`;

export const MapStyle = styled(Map)`
	width: 80%;
	height: 500px;
	margin-top: 2rem;
`;
// #endregion

function Maps({ mapData, seacrhPlaces, getPlaceReverse, loadingAction }) {
	useInjectReducer({
		key: 'map',
		reducer,
	});
	useInjectSaga({
		key: 'map',
		saga,
	});
	const {
		placesList,
		data,
		fetching,
		currentAddress: {
			lat,
			lon,
			display_name,
			address: { city, county, state, postcode, country },
		},
		initialPosition,
	} = mapData;

	const latlng = {
		lat,
		lon,
	};

	const formInitialValues = {
		city,
		county,
		state,
		postcode,
		country,
	};

	useEffect(() => {
		// Find user for the first time
		// findMeOnMep();
	}, []);

	// Find me on me
	const mapRef = useRef(Map);
	const findMeOnMep = () => {
		const currentMapRef = mapRef.current;
		if (currentMapRef) {
			loadingAction();
			currentMapRef.leafletElement.locate();
		}
	};

	// Location found Handler
	const onLocationfoundHandler = value => {
		getPlaceReverse(value.latlng);
	};

	return (
		<MainContianer>
			{/* Map */}
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

			{/* Places Auto Complete */}
			<PlacesAutoComplete
				placesList={placesList}
				seacrhPlaces={seacrhPlaces}
				getPlaceReverse={getPlaceReverse}
				findMeOnMep={findMeOnMep}
				data={data}
				fetching={fetching}
				display_name={display_name}
			/>
			{/* Map Form */}
			<MapForm formInitialValues={formInitialValues} />
		</MainContianer>
	);
}

const mapStateToProps = createStructuredSelector({
	mapData: makeSelectMap(),
});

function mapDispatchToProps(dispatch) {
	return {
		seacrhPlaces: query => dispatch(getPlaceAction(query)),
		getPlaceReverse: value => dispatch(getPlaceReverseAction(value)),
		loadingAction: () => dispatch(getPlaceLoadingAction(true)),
	};
}

Maps.propTypes = {
	mapData: PropTypes.object,
	seacrhPlaces: PropTypes.func,
	getPlaceReverse: PropTypes.func,
	loadingAction: PropTypes.func,
};
const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(withConnect, memo)(Maps);
