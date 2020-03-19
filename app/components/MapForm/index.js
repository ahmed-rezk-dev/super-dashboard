/**
 *
 * MapForm
 *
 */

import React, { useRef, useEffect } from 'react';
import { Form, Input } from 'antd';
import PropTypes from 'prop-types';
import styled from 'styled-components';
// import { FormattedMessage } from 'react-intl';
// import messages from './messages';

const MainContainer = styled(Form)`
	margin-top: 3rem;
	width: 500px;
`;

function MapForm({ formInitialValues }) {
	const formRef = useRef();
	useEffect(() => {
		formRef.current.setFieldsValue(formInitialValues);
	}, [formInitialValues]);
	return (
		<MainContainer
			name="mapForm"
			initialValues={formInitialValues}
			size="large"
			ref={formRef}
		>
			{/* city */}
			<Form.Item
				name="city"
				label="City"
				hasFeedback
				rules={[
					{
						required: true,
					},
				]}
			>
				<Input />
			</Form.Item>

			{/* county */}
			<Form.Item
				name="county"
				label="County"
				hasFeedback
				rules={[
					{
						required: true,
					},
				]}
			>
				<Input />
			</Form.Item>

			{/* State */}
			<Form.Item
				name="state"
				label="State"
				hasFeedback
				rules={[
					{
						required: true,
					},
				]}
			>
				<Input />
			</Form.Item>

			{/* Country */}
			<Form.Item
				name="country"
				label="Country"
				hasFeedback
				rules={[
					{
						required: true,
					},
				]}
			>
				<Input />
			</Form.Item>

			{/* Post code */}
			<Form.Item
				name="postcode"
				label="Post Code"
				hasFeedback
				rules={[
					{
						required: true,
					},
				]}
			>
				<Input />
			</Form.Item>
		</MainContainer>
	);
}

MapForm.propTypes = {
	formInitialValues: PropTypes.object,
};

export default MapForm;
