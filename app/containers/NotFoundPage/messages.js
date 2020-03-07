/*
 * NotFoundPage Messages
 *
 * This contains all the text for the NotFoundPage container.
 */
import { defineMessages } from 'react-intl';

export const scope = 'app.containers.NotFoundPage';

export default defineMessages({
	header: {
		id: `${scope}.header`,
		defaultMessage: 'This is the NotFoundPage container!',
	},
	text_0: {
		id: `${scope}.text_0`,
		defaultMessage: "Look like you're lost",
	},
	go_back: {
		id: `${scope}.go_back`,
		defaultMessage: 'Go Back',
	},
});
