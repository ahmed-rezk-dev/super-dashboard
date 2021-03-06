/*
 * Navbar Messages
 *
 * This contains all the text for the Navbar component.
 */

import { defineMessages } from 'react-intl';

export const scope = 'app.components.Navbar';

export default defineMessages({
	search: {
		id: `${scope}.search`,
		defaultMessage: 'Search',
	},
	dashboard: {
		id: `${scope}.dashboard`,
		defaultMessage: 'Dashboard',
	},
});
