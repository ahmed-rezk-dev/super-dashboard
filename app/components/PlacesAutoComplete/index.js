/**
 *
 * PlacesAutoComplete
 *
 */

import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Input, AutoComplete, Button } from 'antd';
import { AimOutlined } from '@ant-design/icons';

// import { FormattedMessage } from 'react-intl';
// import messages from './messages';

export const AutoCompleteStyle = styled(AutoComplete)`
	width: 500px;
`;
export const MainContainer = styled.div`
	margin-top: 2rem;
`;

function PlacesAutoComplete({
	placesList,
	seacrhPlaces,
	data,
	findMeOnMep,
	getPlaceReverse,
	fetching,
	display_name,
}) {
	const [inputValue, setInputValue] = useState();

	// Select Handler
	const onSelectHandler = value => {
		const { lat, lon } = data.find(place => place.display_name === value);
		getPlaceReverse({ lat, lng: lon });
	};

	// Update input value if the location change
	useEffect(() => {
		setInputValue(display_name);
	}, [display_name]);

	return (
		<MainContainer>
			<AutoCompleteStyle
				options={placesList}
				onSelect={onSelectHandler}
				onSearch={seacrhPlaces}
				value={inputValue}
				onChange={setInputValue}
			>
				<Input size="large" placeholder="Type Your Address." />
			</AutoCompleteStyle>
			<Button
				icon={<AimOutlined />}
				type="link"
				onClick={findMeOnMep}
				loading={fetching}
			/>
		</MainContainer>
	);
}

PlacesAutoComplete.propTypes = {
	placesList: PropTypes.array,
	data: PropTypes.array,
	seacrhPlaces: PropTypes.func,
	findMeOnMep: PropTypes.func,
	getPlaceReverse: PropTypes.func,
	fetching: PropTypes.bool,
	display_name: PropTypes.string,
};

export default PlacesAutoComplete;
