/*
 *
 * Login reducer
 *
 */
import produce from 'immer';

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

export const initialState = {
	fetching: false,
	payload: null,
	error: false,
	form: 'login',
};

/* eslint-disable default-case, no-param-reassign */
const loginReducer = (state = initialState, action) =>
	produce(state, (/* draft */) => {
		switch (action.type) {
			case LOGIN_REQUEST:
				return { ...state, fetching: true, payload: action.payload };
			case FORGET_PASSWORD_REQUEST:
				return { ...state, fetching: true, payload: action.payload };
			case CHECK_RESET_TOKEN:
				return { ...state, fetching: false, payload: action.payload };
			case RESET_PASSWORD:
				return { ...state, fetching: true, payload: action.payload };
			case LOGIN_SUCCESS:
				return { ...state, fetching: false, payload: action.payload || null };
			case CHANGE_FORM:
				return {
					...state,
					fetching: false,
					payload: null,
					form: action.form,
				};
			case LOGIN_ERROR:
				return {
					...state,
					fetching: false,
					payload: action.payload,
					error: true,
				};
			case LOGOUT_ACTION:
				return {
					...state,
					fetching: false,
					payload: null,
					error: false,
				};
		}
	});

export default loginReducer;
