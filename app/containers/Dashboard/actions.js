/*
 *
 * Dashboard actions
 *
 */

import { GET_ACCOUNT_REQUEST } from './constants';

export function getAccount() {
	return {
		type: GET_ACCOUNT_REQUEST,
	};
}
