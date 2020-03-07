/**
 *
 * Login
 *
 */

import { FormattedMessage } from 'react-intl';
import { animated, useTransition } from 'react-spring';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import PropTypes from 'prop-types';
import React, { useEffect, useMemo, memo } from 'react';

import { useInjectReducer } from 'utils/injectReducer';
import { useInjectSaga } from 'utils/injectSaga';
import { Button } from 'antd';
import { LinkedinOutlined, MailOutlined } from '@ant-design/icons';
import {
	LoginHeader,
	MainContainer,
	Title,
	Text,
	Separator,
	LoginFormContainer,
	LoginFooterContainer,
	LoginFooterLinksContainer,
} from 'components/Login';
import {
	changeForm,
	checkResetToken,
	forgetPasswordRequest,
	loginRequest,
	resetPassword,
} from './actions';
import { makeSelectAuth } from '../App/selectors';
import LoginForm from '../../components/LoginForm/index';
import ForgetPasswordUsingEmail from '../../components/ForgetPasswordUsingEmail';
import ResetForm from '../../components/ForgetPasswordUsingEmail/resetForm';
import makeSelectLogin from './selectors';
import messages from './messages';
import reducer from './reducer';
import saga from './saga';

export function Login({
	login,
	auth,
	history,
	location,
	loginDis,
	sendForgetPasswordRequest,
	checkResetTokenReducer,
	resetPasswordReducer,
	changeFormReducer,
}) {
	useInjectReducer({ key: 'login', reducer });

	useInjectSaga({ key: 'login', saga });

	const { fetching, form } = login;

	const transitions = useTransition(form, null, {
		from: {
			opacity: 0,
			transform: 'translate3d(100%,0,0)',
			position: 'absolute',
		},
		enter: { opacity: 1, transform: 'translate3d(0%,0,0)' },
		leave: { opacity: 0, transform: 'translate3d(-10%,0,0)' },
	});

	useEffect(() => {
		// Check user isAuthenticated
		if (auth.isAuthenticated) {
			history.push('/admin');
		}

		// Check form status
		if (location.hash === '#forgetPassword') {
			changeFormReducer('forget');
		} else if (location.hash === '#reset') {
			changeFormReducer('reset');
		}
	}, []);

	const formHandlerMemo = transitions.map(({ item, props, key }) => {
		const loginForm = (
			<animated.div key={key} style={props}>
				<LoginForm
					fetching={fetching}
					loginDis={loginDis}
					changeFormReducer={changeFormReducer}
					login={login}
				/>
			</animated.div>
		);

		const forgetPasswordForm = (
			<animated.div key={key} style={props}>
				<ForgetPasswordUsingEmail
					fetching={fetching}
					sendForgetPasswordRequest={sendForgetPasswordRequest}
					changeFormReducer={changeFormReducer}
					login={login}
				/>
			</animated.div>
		);

		const resetPasswordForm = (
			<animated.div key={key} style={props}>
				<ResetForm
					fetching={fetching}
					checkResetTokenReducer={checkResetTokenReducer}
					resetPasswordReducer={resetPasswordReducer}
					changeFormReducer={changeFormReducer}
					location={location}
					login={login}
				/>
			</animated.div>
		);

		if (item === 'login') {
			return loginForm;
		}
		if (item === 'forget') {
			return forgetPasswordForm;
		}
		if (item === 'reset') {
			return resetPasswordForm;
		}
		return loginForm;
	});

	const formHandler = useMemo(() => formHandlerMemo, [form, login]);

	return (
		<MainContainer>
			<LoginHeader justify="center">
				<Title>
					<FormattedMessage {...messages.welcome} />
				</Title>
				<Text>
					<FormattedMessage {...messages.loginLabel} />
				</Text>
				<Separator>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						preserveAspectRatio="none"
						version="1.1"
						viewBox="0 0 2560 100"
						x="0"
						y="0"
					>
						<polygon
							className="separator-polygon"
							points="2560 0 2560 100 0 100"
						></polygon>
					</svg>
				</Separator>
			</LoginHeader>

			{/* Forms */}
			<LoginFormContainer justify="center">{formHandler}</LoginFormContainer>

			{/* footer */}
			<LoginFooterContainer>
				<LoginFooterLinksContainer>
					<Button
						shape="circle"
						size="large"
						icon={<LinkedinOutlined />}
						target="_block"
						href="https://www.linkedin.com/in/ahmed-rezk-dev/"
						title="Linkedin"
					/>
					<Button
						shape="circle"
						size="large"
						icon={<MailOutlined />}
						href="mailto:work72019@gmail.com"
						title="work72019@gmail.com"
					/>
				</LoginFooterLinksContainer>
				<p>React Dashboard ©2020 Created by Ahmed Rezk</p>
			</LoginFooterContainer>
		</MainContainer>
	);
}

Login.propTypes = {
	loginDis: PropTypes.func,
	sendForgetPasswordRequest: PropTypes.func,
	checkResetTokenReducer: PropTypes.func,
	resetPasswordReducer: PropTypes.func,
	changeFormReducer: PropTypes.func,
	login: PropTypes.object,
	auth: PropTypes.object,
	history: PropTypes.object,
	location: PropTypes.object,
	theme: PropTypes.object,
};

const mapStateToProps = createStructuredSelector({
	login: makeSelectLogin(),
	auth: makeSelectAuth(),
});

function mapDispatchToProps(dispatch) {
	return {
		loginDis: data => dispatch(loginRequest(data)),
		sendForgetPasswordRequest: data => dispatch(forgetPasswordRequest(data)),
		checkResetTokenReducer: data => dispatch(checkResetToken(data)),
		resetPasswordReducer: data => dispatch(resetPassword(data)),
		changeFormReducer: data => dispatch(changeForm(data)),
	};
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(withConnect, memo)(Login);
