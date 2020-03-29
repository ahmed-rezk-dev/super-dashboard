/*
 *
 * UserProfile actions
 *
 */

import {
	USER_UPDATE_ACTION,
	USER_SUCCESS_ACTION,
	USER_ERROR_ACTION,
	USER_UPDATE_PASSWORD_ACTION,
	USER_UPDATE_AVATAR_ACTION,
} from './constants';

// User update
export function userUpdateAction(payload) {
	return {
		type: USER_UPDATE_ACTION,
		payload,
	};
}

// User success
export function userSuccessAction(data) {
	return {
		type: USER_SUCCESS_ACTION,
		data,
	};
}

// User error
export function userErrorAction(payload) {
	return {
		type: USER_ERROR_ACTION,
		payload,
	};
}

// User update avatar
export function userUpdateAvatarAction(payload) {
	return {
		type: USER_UPDATE_AVATAR_ACTION,
		payload,
	};
}

// User update password
export function userUpdatePassword(payload) {
	return {
		type: USER_UPDATE_PASSWORD_ACTION,
		payload,
	};
}
