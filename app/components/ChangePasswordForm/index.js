/**
 *
 * UserEditForm
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { Form, Input, Button, Divider } from 'antd';
const passowrdReg = /^(?=.*d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/;

const formItemLayout = {
	labelCol: {
		xs: { span: 24 },
		sm: { span: 4 },
		md: { span: 2 },
	},
	wrapperCol: {
		xs: { span: 24 },
		sm: { span: 16 },
		md: { span: 10 },
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

function ChangePasswordForm({ changePassword, fetching }) {
	// handle Submit
	const handleSubmitForm = values => {
		changePassword(values);
	};

	return (
		<Form {...formItemLayout} onFinish={handleSubmitForm}>
			{/* Old Passwoed */}
			<Form.Item
				name="old_password"
				label="Old Password"
				rules={[
					{
						required: true,
						message: 'Please input your old password!',
					},
				]}
				hasFeedback
			>
				<Input.Password />
			</Form.Item>

			{/* New Password */}
			<Divider orientation="left">New Password</Divider>
			<Form.Item
				name="password"
				label="Password"
				rules={[
					{
						required: true,
						message:
							'Please Ensure that password at least 8 characters long and contains a mix of upper and lower case characters, one numeric',
						pattern: passowrdReg,
					},
				]}
				hasFeedback
			>
				<Input.Password />
			</Form.Item>
			<Form.Item
				name="confirm"
				label="Confirm Password"
				dependencies={['password']}
				hasFeedback
				rules={[
					{
						required: true,
						message: 'Please confirm your password!',
					},
					({ getFieldValue }) => ({
						validator(rule, value) {
							if (!value || getFieldValue('password') === value) {
								return Promise.resolve();
							}

							return Promise.reject(
								new Error('The two passwords that you entered do not match!')
							);
						},
					}),
				]}
			>
				<Input.Password />
			</Form.Item>
			{/* Button */}
			<Form.Item {...tailFormItemLayout}>
				<Button
					type="primary"
					htmlType="submit"
					size="large"
					loading={fetching}
				>
					Update
				</Button>
			</Form.Item>
		</Form>
	);
}

ChangePasswordForm.propTypes = {
	fetching: PropTypes.bool,
	changePassword: PropTypes.func,
};
export default ChangePasswordForm;
