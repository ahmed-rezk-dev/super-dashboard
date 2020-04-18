/*
 */
import jwtDecode from 'jwt-decode';
import { setAuthToken } from 'utils/Auth';
import { SET_CURRRENT_USER } from 'containers/App/constants';
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

// User update password
export function userUpdateCurrentAction(payload) {
	const { token, refreshToken } = payload;
	setAuthToken(token, refreshToken);
	const decodedToken = jwtDecode(token);
	const userToAddToRedux = { ...decodedToken, token, refreshToken };
	// yield all([put(loginSuccess(data)), put(setCurrentUser(userToAddToRedux))]);
	return {
		type: SET_CURRRENT_USER,
		payload: userToAddToRedux,
	};
}
