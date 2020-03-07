/**
 *
 * LoginForm
 *
 */
import React, { memo } from 'react';
import { FormattedMessage } from 'react-intl';
import PropTypes from 'prop-types';
import { Form, Input, Button, Row } from 'antd';
import { MailOutlined, LockOutlined } from '@ant-design/icons';
import { compose } from 'redux';
import { FormCard, FormCardInfo, LoginFormButton } from 'components/Login';
import messages from './messages';

function LoginForm({ fetching, changeFormReducer, loginDis }) {
	const handleSubmitForm = values => {
		loginDis(values);
	};

	return (
		<FormCard>
			<div className="card-header">
				<h3>
					<FormattedMessage {...messages.loginTitle} />
				</h3>
			</div>
			<FormCardInfo>
				<p>Email: work72019@gmail.com</p>
				<p>Password: 123456</p>
			</FormCardInfo>
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
				<Form.Item
					hasFeedback
					name="password"
					rules={[{ required: true, message: 'Please input your Password!' }]}
				>
					<Input.Password
						prefix={<LockOutlined />}
						type="password"
						placeholder="Password"
						size="large"
					/>
				</Form.Item>
				<Form.Item>
					<LoginFormButton
						type="primary"
						htmlType="submit"
						size="large"
						loading={fetching}
					>
						<FormattedMessage {...messages.loginBtn} />
					</LoginFormButton>
					<Row justify="center">
						<Button
							type="link"
							onClick={() => changeFormReducer('forget')}
							href="#forgetPassword"
						>
							<FormattedMessage {...messages.forgetPassword} />
						</Button>
					</Row>
				</Form.Item>
			</Form>
		</FormCard>
	);
}

LoginForm.propTypes = {
	fetching: PropTypes.bool,
	changeFormReducer: PropTypes.func.isRequired,
	loginDis: PropTypes.func.isRequired,
	form: PropTypes.object,
};

export default compose(memo)(LoginForm);
