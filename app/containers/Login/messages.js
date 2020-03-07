/*
 * Login Messages
 *
 * This contains all the text for the Login container.
 */

import { defineMessages } from 'react-intl';

export const scope = 'app.containers.Login';

export default defineMessages({
	header: {
		id: `${scope}.header`,
		defaultMessage: 'Admin Login',
	},
	welcome: {
		id: `${scope}.welcome`,
		defaultMessage: 'Welcome',
	},
	loginLabel: {
		id: `${scope}.loginLabel`,
		defaultMessage: 'Use this awesome form to login',
	},
});
