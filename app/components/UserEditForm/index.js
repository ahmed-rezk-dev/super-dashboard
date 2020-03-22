/**
 *
 * UserEditForm
 *
 */

import React, { useState, useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
// import styled from 'styled-components';
import { Form, Input, Row, Button, Col, Select } from 'antd';
import { compose } from 'redux';
import CustomMap from 'components/CustomMap';
import PlacesAutoComplete from 'components/PlacesAutoComplete';

const formItemLayout = {
	labelCol: {
		xs: { span: 24 },
		sm: { span: 4 },
		md: { span: 4 },
	},
	wrapperCol: {
		xs: { span: 24 },
		sm: { span: 16 },
		md: { span: 19 },
	},
};
const tailFormItemLayout = {
	wrapperCol: {
		xs: {
			span: 24,
			offset: 0,
		},
		sm: {
			span: 16,
			offset: 2,
		},
	},
};

const { Option } = Select;

function UserEditForm({
	fetchaing,
	initialValues,
	mapData,
	getPlaceReverse,
	loadingAction,
	seacrhPlaces,
	updateUser,
}) {
	const { currentAddress } = mapData;

	const { location } = initialValues;
	// Map Data
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
	} = mapData;

	// Find me on me
	const mapRef = useRef(CustomMap);
	const findMeOnMep = () => {
		const currentMapRef = mapRef.current;
		if (currentMapRef) {
			loadingAction();
			currentMapRef.leafletElement.locate();
		}
	};

	// Form Ref
	const formRef = useRef();
	useEffect(() => {
		formRef.current.setFieldsValue(currentAddress.address);
	}, [currentAddress]);

	// handle Submit
	const handleSubmitForm = values => {
		console.log('values:', values);
		updateUser(values);
	};

	return (
		<Row>
			<Col span={12}>
				<Form
					{...formItemLayout}
					onFinish={handleSubmitForm}
					initialValues={initialValues}
					ref={formRef}
				>
					{/* Name */}
					<Form.Item
						label="Name"
						name="name"
						hasFeedback
						rules={[
							{
								required: true,
							},
						]}
					>
						<Input />
					</Form.Item>

					{/* Email */}
					<Form.Item
						label="Email"
						name="email"
						hasFeedback
						rules={[
							{
								type: 'email',
								required: true,
							},
						]}
					>
						<Input />
					</Form.Item>

					{/* Gander */}
					<Form.Item
						label="Gander"
						name="gander"
						hasFeedback
						rules={[
							{
								required: true,
							},
						]}
					>
						<Select allowClear>
							<Option value="male">male</Option>
							<Option value="female">female</Option>
							<Option value="other">other</Option>
						</Select>
					</Form.Item>

					{/* Address */}
					<Form.Item
						name="location"
						label="Address"
						hasFeedback
						rules={[{ required: true, message: 'Please input your address!' }]}
					>
						{/* Places Auto Complete */}
						<PlacesAutoComplete
							placesList={placesList}
							seacrhPlaces={seacrhPlaces}
							getPlaceReverse={getPlaceReverse}
							findMeOnMep={findMeOnMep}
							data={data}
							fetching={fetching}
							display_name={display_name}
							formRef={formRef}
						/>
					</Form.Item>

					{/* Postcode */}
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

					{/* Button */}
					<Form.Item {...tailFormItemLayout}>
						<Button
							type="primary"
							htmlType="submit"
							size="large"
							loading={fetchaing}
						>
							Update
						</Button>
					</Form.Item>
				</Form>
			</Col>
			<Col span={12}>
				<CustomMap
					mapRef={mapRef}
					mapData={mapData}
					getPlaceReverse={getPlaceReverse}
				/>
			</Col>
		</Row>
	);
}

UserEditForm.propTypes = {
	placesList: PropTypes.array,
	data: PropTypes.array,
	seacrhPlaces: PropTypes.func,
	findMeOnMep: PropTypes.func,
	getPlaceReverse: PropTypes.func,
	fetching: PropTypes.bool,
	display_name: PropTypes.string,
	fetchaing: PropTypes.bool,
	initialValues: PropTypes.object,
	mapData: PropTypes.object,
	loadingAction: PropTypes.func,
	updateUser: PropTypes.func,
};
export default UserEditForm;
