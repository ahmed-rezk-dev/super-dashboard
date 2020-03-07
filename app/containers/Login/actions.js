/*
 *
 * Login actions
 *
 */

import {
	CHANGE_FORM,
	CHECK_RESET_TOKEN,
	FORGET_PASSWORD_REQUEST,
	LOGIN_ERROR,
	LOGIN_REQUEST,
	LOGIN_SUCCESS,
	LOGOUT_ACTION,
	RESET_PASSWORD,
} from './constants';

export function loginRequest(payload) {
	return {
		type: LOGIN_REQUEST,
		payload,
	};
}

export function forgetPasswordRequest(payload) {
	return {
		type: FORGET_PASSWORD_REQUEST,
		payload,
	};
}

export function checkResetToken(payload) {
	return {
		type: CHECK_RESET_TOKEN,
		payload,
	};
}

export function resetPassword(payload) {
	return {
		type: RESET_PASSWORD,
		payload,
	};
}

export function loginSuccess(payload) {
	return {
		type: LOGIN_SUCCESS,
		payload,
	};
}

export function loginError(payload) {
	return {
		type: LOGIN_ERROR,
		payload,
	};
}

export function logout() {
	return {
		type: LOGOUT_ACTION,
	};
}

export function changeForm(form) {
	return {
		type: CHANGE_FORM,
		form,
	};
}
