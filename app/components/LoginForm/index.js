/**
 *
 * LoginForm
 *
 */
import React, { memo } from 'react';
import { FormattedMessage } from 'react-intl';
import PropTypes from 'prop-types';
import { Form, Icon, Input, Button, Row } from 'antd';
import { compose } from 'redux';
import messages from './messages';

function LoginForm({ fetching, changeFormReducer, loginDis }) {
	const handleSubmitForm = values => {
		loginDis(values);
	};

	return (
		<div className="card form-card">
			<div className="card-header">
				<h3 className="card-title">
					<FormattedMessage {...messages.loginTitle} />
				</h3>
			</div>
			<div className="info">
				<p>Email: work72019@gmail.com</p>
				<p>Password: 123456</p>
			</div>
			<Form onFinish={handleSubmitForm} className="login-form">
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
					<Input
						prefix={<Icon type="mail" />}
						placeholder="Email"
						size="large"
					/>
				</Form.Item>
				<Form.Item
					hasFeedback
					name="password"
					rules={[{ required: true, message: 'Please input your Password!' }]}
				>
					<Input.Password
						prefix={<Icon type="lock" />}
						type="password"
						placeholder="Password"
						size="large"
					/>
				</Form.Item>
				<Form.Item>
					<Button
						type="primary"
						htmlType="submit"
						size="large"
						className="login-form-button"
						loading={fetching}
					>
						<FormattedMessage {...messages.loginBtn} />
					</Button>
					<Row>
						{/* {getFieldDecorator('remember', {
							valuePropName: 'checked',
							initialValue: true,
						})(<Checkbox>Remember me</Checkbox>)}
						<Divider type="vertical" /> */}
						{/* Start => Forget Password link */}
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
		</div>
	);
}

LoginForm.propTypes = {
	fetching: PropTypes.bool,
	changeFormReducer: PropTypes.func.isRequired,
	loginDis: PropTypes.func.isRequired,
	form: PropTypes.object,
};

export default compose(memo)(LoginForm);
