import React, { memo } from 'react';
import { FormattedMessage } from 'react-intl';
import PropTypes from 'prop-types';
import { Form, Icon, Input, Button, Row } from 'antd';
import { compose } from 'redux';
import styled from 'styled-components';
import messages from './messages';

function ForgetPasswordUsingEmail({
	changeFormReducer,
	fetching,
	form,
	sendForgetPasswordRequest,
}) {
	const Text = styled.p`
		text-align: 'center';
	`;
	const { getFieldDecorator } = form;
	const handleSubmitForm = e => {
		e.preventDefault();
		form.validateFields((err, values) => {
			if (!err) {
				sendForgetPasswordRequest(values);
			}
		});
	};

	const handleChangeForm = () => {
		changeFormReducer('login');
	};

	return (
		<div className="card form-card">
			{/* Start => card header */}
			<div className="card-header">
				<h3 className="card-title">
					<FormattedMessage {...messages.forgetPassword} />
				</h3>

				<Text>
					<FormattedMessage {...messages.forgetPasswordLabel} />
				</Text>
			</div>
			<Form onSubmit={handleSubmitForm} className="login-form">
				<Form.Item hasFeedback>
					{getFieldDecorator('email', {
						rules: [
							{
								type: 'email',
								required: true,
								message: 'Please input your Email!',
							},
						],
					})(
						<Input
							prefix={<Icon type="mail" />}
							placeholder="Email"
							size="large"
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
						Send!
					</Button>
					<Row>
						{/* Start => Forget Password link */}
						<Button type="link" onClick={handleChangeForm} href="#login">
							<FormattedMessage {...messages.loginTitle} />
						</Button>
					</Row>
				</Form.Item>
			</Form>
		</div>
	);
}

ForgetPasswordUsingEmail.propTypes = {
	form: PropTypes.object,
	sendForgetPasswordRequest: PropTypes.func,
	changeFormReducer: PropTypes.func,
	fetching: PropTypes.bool,
};
export default compose(memo)(ForgetPasswordUsingEmail);
