/**
 *
 * UserEditForm
 *
 */

import React, { useState } from 'react';
import PropTypes from 'prop-types';
// import styled from 'styled-components';
import { Form, Input, Row, Button, Col, Select, AutoComplete } from 'antd';
import { compose } from 'redux';
const { Option } = Select;

const formItemLayout = {
	labelCol: {
		xs: { span: 24 },
		sm: { span: 2 },
	},
	wrapperCol: {
		xs: { span: 24 },
		sm: { span: 16 },
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

const mockVal = (str, repeat = 1) => ({
	value: str.repeat(repeat),
});
function UserEditForm({ fetchaing }) {
	const [value, setValue] = useState('');
	const [options, setOptions] = useState([]);
	const [autoCompleteResult, setAutoCompleteResult] = useState([]);

	// Auto Complate
	const onSearch = searchText => {
		setOptions(
			!searchText
				? []
				: [mockVal(searchText), mockVal(searchText, 2), mockVal(searchText, 3)]
		);
	};
	const onSelect = data => {
		console.log('onSelect', data);
	};
	const onChange = data => {
		setValue(data);
	};

	// handle Submit
	const handleSubmitForm = values => {
		console.log('values:', values);
	};

	return (
		<Form
			{...formItemLayout}
			onFinish={handleSubmitForm}
			// initialValues={}
		>
			{/* Name */}
			<Form.Item
				label="Username"
				name="username"
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
				<AutoComplete options={options} onSelect={onSelect} onSearch={onSearch}>
					<Input />
				</AutoComplete>
			</Form.Item>

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
	);
}

UserEditForm.propTypes = {};
export default UserEditForm;
