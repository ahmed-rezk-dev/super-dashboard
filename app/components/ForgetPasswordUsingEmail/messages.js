/*
 * ForgetPasswordUsingEmail Messages
 *
 * This contains all the text for the ForgetPasswordUsingEmail component.
 */

import { defineMessages } from 'react-intl';

export const scope = 'app.components.ForgetPasswordUsingEmail';

export default defineMessages({
	header: {
		id: `${scope}.header`,
		defaultMessage: 'This is the ForgetPasswordUsingEmail component!',
	},
	loginTitle: {
		id: `${scope}.loginTitle`,
		defaultMessage: 'Login',
	},
	sendBtn: {
		id: `${scope}.sendBtn`,
		defaultMessage: 'Send!',
	},
	resetBtn: {
		id: `${scope}.resetBtn`,
		defaultMessage: 'Done!',
	},
	forgetPassword: {
		id: `${scope}.forgetPassword`,
		defaultMessage: 'Forget Password!',
	},
	forgetPasswordLabel: {
		id: `${scope}.forgetPasswordLabel`,
		defaultMessage:
			'We will send you an email that will allow you to reset your password.',
	},
	resetPassword: {
		id: `${scope}.resetPassword`,
		defaultMessage: 'Reset Password!',
	},
	resetPasswordLabel: {
		id: `${scope}.resetPasswordLabel`,
		defaultMessage: 'Please enter your new password.',
	},
	emailAddress: {
		id: `${scope}.emailAddress`,
		defaultMessage: 'Email address',
	},
	EnterPasseord: {
		id: `${scope}.EnterPasseord`,
		defaultMessage: 'Enter Password',
	},
});
