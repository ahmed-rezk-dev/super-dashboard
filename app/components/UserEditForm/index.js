/**
 *
 * UserEditForm
 *
 */

import React, { useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
// import styled from 'styled-components';
import { Form, Input, Row, Button, Col, Select } from 'antd';
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
	userFetching,
	initialValues,
	mapData,
	getPlaceReverse,
	loadingAction,
	seacrhPlaces,
	updateUser,
}) {
	const { currentAddress } = mapData;
	// Map Data
	const {
		placesList,
		data,
		fetching,
		currentAddress: { display_name, lat, lon },
	} = mapData;

	// latlon of database
	const latlon = {
		lat: lat || initialValues.lat,
		lng: lon || initialValues.lng,
	};

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
		const form = formRef.current;
		if (form) {
			if (currentAddress.display_name !== '') {
				form.setFieldsValue({
					...currentAddress.address,
					address: currentAddress.display_name,
				});
			} else {
				form.setFieldsValue(initialValues);
			}
		}
	}, [currentAddress]);

	// handle Submit
	const handleSubmitForm = values => {
		const mergeValues = {
			values: { ...values, ...latlon },
			_id: initialValues._id,
		};
		updateUser(mergeValues);
	};

	return (
		<Row>
			<Col span={12}>
				<Form {...formItemLayout} onFinish={handleSubmitForm} ref={formRef}>
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

					{/* Gender */}
					<Form.Item
						label="Gender"
						name="gender"
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
						name="address"
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
							display_name={initialValues.address || display_name}
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
							loading={userFetching || fetching}
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
					latlonDB={latlon}
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
	userFetching: PropTypes.bool,
	initialValues: PropTypes.object,
	mapData: PropTypes.object,
	formRef: PropTypes.object,
	loadingAction: PropTypes.func,
	updateUser: PropTypes.func,
};
export default UserEditForm;
