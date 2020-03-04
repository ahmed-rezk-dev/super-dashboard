/*
 * UserMenu Messages
 *
 * This contains all the text for the UserMenu component.
 */

import { defineMessages } from 'react-intl';

export const scope = 'app.components.UserMenu';

export default defineMessages({
	profile: {
		id: `${scope}.profile`,
		defaultMessage: 'Profile',
	},
	settings: {
		id: `${scope}.settings`,
		defaultMessage: 'Settings',
	},
	logout: {
		id: `${scope}.logout`,
		defaultMessage: 'Logout',
	},
});
