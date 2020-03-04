/*
 * LoginForm Messages
 *
 * This contains all the text for the LoginForm component.
 */

import { defineMessages } from 'react-intl';

export const scope = 'app.components.LoginForm';

export default defineMessages({
	loginTitle: {
		id: `${scope}.loginTitle`,
		defaultMessage: 'Login',
	},
	loginBtn: {
		id: `${scope}.loginBtn`,
		defaultMessage: 'Login',
	},
	forgetPassword: {
		id: `${scope}.forgetPassword`,
		defaultMessage: 'Forget Password!',
	},
	emailAddress: {
		id: `${scope}.emailAddress`,
		defaultMessage: 'Email address',
	},
	EnterPasseord: {
		id: `${scope}.EnterPasseord`,
		defaultMessage: 'Enter Password',
	},
	rememberMe: {
		id: `${scope}.rememberMe`,
		defaultMessage: 'Remember me!',
	},
});
