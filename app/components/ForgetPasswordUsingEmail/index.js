import React, { memo } from 'react';
import { FormattedMessage } from 'react-intl';
import PropTypes from 'prop-types';
import { Form, Input, Button, Row } from 'antd';
import { MailOutlined } from '@ant-design/icons';
import { compose } from 'redux';
import styled from 'styled-components';
import { FormCard } from 'components/Login';
import { CardHeader } from 'components/Card';
import messages from './messages';

function ForgetPasswordUsingEmail({
	changeFormReducer,
	fetching,
	sendForgetPasswordRequest,
}) {
	const Text = styled.p`
		text-align: 'center';
	`;

	const handleSubmitForm = values => {
		sendForgetPasswordRequest(values);
	};

	const handleChangeForm = () => {
		changeFormReducer('login');
	};

	return (
		<FormCard>
			{/* Start => card header */}
			<CardHeader>
				<h3>
					<FormattedMessage {...messages.forgetPassword} />
				</h3>

				<Text>
					<FormattedMessage {...messages.forgetPasswordLabel} />
				</Text>
			</CardHeader>
			<Form onFinish={handleSubmitForm}>
				<Form.Item
					hasFeedback
					name="email"
					rules={[
						{
							type: 'email',
							required: true,
							message: 'Please input your Email!',
						},
					]}
				>
					<Input prefix={<MailOutlined />} placeholder="Email" size="large" />
				</Form.Item>
				<Form.Item>
					<Row justify="center">
						<Button
							type="primary"
							htmlType="submit"
							size="large"
							className="login-form-button"
							loading={fetching}
						>
							Send!
						</Button>
					</Row>
					<Row justify="center">
						{/* Start => Forget Password link */}
						<Button type="link" onClick={handleChangeForm} href="#login">
							<FormattedMessage {...messages.loginTitle} />
						</Button>
					</Row>
				</Form.Item>
			</Form>
		</FormCard>
	);
}

ForgetPasswordUsingEmail.propTypes = {
	form: PropTypes.object,
	sendForgetPasswordRequest: PropTypes.func,
	changeFormReducer: PropTypes.func,
	fetching: PropTypes.bool,
};
export default compose(memo)(ForgetPasswordUsingEmail);
