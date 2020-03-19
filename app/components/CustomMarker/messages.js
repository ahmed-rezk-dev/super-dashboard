/*
 * CustomMarker Messages
 *
 * This contains all the text for the CustomMarker component.
 */

import { defineMessages } from 'react-intl';

export const scope = 'app.components.CustomMarker';

export default defineMessages({
	header: {
		id: `${scope}.header`,
		defaultMessage: 'This is the CustomMarker component!',
	},
});
