import React, { useEffect, useState, memo } from 'react';
import { FormattedMessage } from 'react-intl';
import PropTypes from 'prop-types';
import queryString from 'query-string';
import styled from 'styled-components';
import { Form, Input, Icon, Button, Row } from 'antd';
import { compose } from 'redux';
import messages from './messages';

let params;

function ForgetPasswordUsingEmail({
	changeFormReducer,
	fetching = false,
	location,
	checkResetTokenReducer,
	form,
	resetPasswordReducer,
}) {
	const Text = styled.p`
		text-align: 'center';
	`;
	const [confirmDirty, setConfirmDirty] = useState(false);

	useEffect(() => {
		checkResetTokenReducer(params.token);
	}, []);

	const url = location.search;
	params = queryString.parse(url);

	const { getFieldDecorator } = form;
	const handleSubmitForm = e => {
		e.preventDefault();
		form.validateFields((err, values) => {
			if (!err) {
				resetPasswordReducer({ ...values, token: params.token });
			}
		});
	};

	const compareToFirstPassword = (rule, value, callback) => {
		if (value && value !== form.getFieldValue('password')) {
			callback('Two passwords that you enter is inconsistent!');
		} else {
			callback();
		}
	};

	const validateToNextPassword = (rule, value, callback) => {
		if (value && confirmDirty) {
			form.validateFields(['confirm'], { force: true });
		}
		callback();
	};

	const handleConfirmBlur = e => {
		const { value } = e.target;
		setConfirmDirty(confirmDirty || !!value);
	};

	return (
		<div className="card form-card">
			{/* Start => card header */}
			<div className="card-header">
				<h3 className="card-title">
					<FormattedMessage {...messages.resetPassword} />
				</h3>

				<Text>
					<FormattedMessage {...messages.resetPasswordLabel} />
				</Text>
			</div>
			<Form onSubmit={handleSubmitForm} className="login-form">
				<Form.Item hasFeedback>
					{getFieldDecorator('password', {
						rules: [
							{
								required: true,
								message: 'Please input your password!',
							},
							{
								validator: validateToNextPassword,
							},
						],
					})(
						<Input.Password
							prefix={<Icon type="lock" />}
							type="password"
							placeholder="Password"
							size="large"
						/>
					)}
				</Form.Item>
				<Form.Item hasFeedback>
					{getFieldDecorator('confirm', {
						rules: [
							{
								required: true,
								message: 'Please confirm your password!',
							},
							{
								validator: compareToFirstPassword,
							},
						],
					})(
						<Input.Password
							prefix={<Icon type="lock" />}
							type="password"
							placeholder="Confirm Password"
							size="large"
							onBlur={handleConfirmBlur}
						/>
					)}
				</Form.Item>
				<Form.Item>
					<Button
						type="primary"
						htmlType="submit"
						size="large"
						className="login-form-button"
						loading={fetching}
					>
						<FormattedMessage {...messages.resetBtn} />
					</Button>
					<Row>
						{/* Start => Forget Password link */}
						<Button
							type="link"
							onClick={() => changeFormReducer('login')}
							href="#login"
						>
							<FormattedMessage {...messages.loginTitle} />
						</Button>
					</Row>
				</Form.Item>
			</Form>
		</div>
	);
}

ForgetPasswordUsingEmail.propTypes = {
	login: PropTypes.object,
	checkResetTokenReducer: PropTypes.func,
	changeFormReducer: PropTypes.func,
	resetPasswordReducer: PropTypes.func.isRequired,
	fetching: PropTypes.bool,
	location: PropTypes.object,
	form: PropTypes.object,
};

export default compose(memo)(ForgetPasswordUsingEmail);
