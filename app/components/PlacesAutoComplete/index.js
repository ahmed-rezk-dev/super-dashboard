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

export const MainContainer = styled.div`
	display: flex;
`;

function PlacesAutoComplete({
	placesList,
	seacrhPlaces,
	data,
	findMeOnMep,
	getPlaceReverse,
	fetching,
	display_name,
	formRef,
}) {
	const [inputValue, setInputValue] = useState();
	// Select Handler
	const onSelectHandler = value => {
		const { lat, lon } = data.find(place => place.display_name === value);
		getPlaceReverse({ lat, lng: lon });
	};

	// Update input value if the address change
	useEffect(() => {
		setInputValue(display_name);
		formRef.current.setFieldsValue({ address: display_name });
	}, [display_name]);

	return (
		<MainContainer>
			<Button
				icon={<AimOutlined />}
				type="ghost"
				onClick={findMeOnMep}
				loading={fetching}
			/>
			<AutoComplete
				options={placesList}
				onSelect={onSelectHandler}
				onSearch={seacrhPlaces}
				value={inputValue}
				onChange={setInputValue}
			>
				<Input placeholder="Type Your Address." />
			</AutoComplete>
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
	formRef: PropTypes.object,
};

export default PlacesAutoComplete;
