/*
 * Example Messages
 *
 * This contains all the text for the Example component.
 */

import { defineMessages } from 'react-intl';

export const scope = 'app.components.Example';

export default defineMessages({
	header: {
		id: `${scope}.header`,
		defaultMessage: 'This is the Example component!',
	},
});
