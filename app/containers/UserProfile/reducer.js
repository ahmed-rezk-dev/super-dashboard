/*
 *
 * UserProfile reducer
 *
 */
import produce from 'immer';
import {
	USER_UPDATE_ACTION,
	USER_SUCCESS_ACTION,
	USER_ERROR_ACTION,
	USER_UPDATE_PASSWORD_ACTION,
	USER_UPDATE_AVATAR_ACTION,
	USER_UPDATE_CURRENT,
} from './constants';

export const initialState = {
	fetching: false,
	isLoading: false,
	error: false,
	payload: null,
	msg: null,
	data: [],
};

/* eslint-disable default-case, no-param-reassign */
const userProfileReducer = (state = initialState, action) =>
	produce(state, draft => {
		const { type, data, payload, msg } = action;
		switch (type) {
			case USER_UPDATE_ACTION:
				draft.payload = payload;
				draft.fetching = true;
				break;
			case USER_SUCCESS_ACTION:
				draft.data = data;
				draft.fetching = false;
				break;
			case USER_ERROR_ACTION:
				draft.payload = payload;
				draft.error = true;
				draft.fetching = false;
				draft.msg = msg;
				break;
			case USER_UPDATE_AVATAR_ACTION:
				draft.payload = payload;
				draft.fetching = true;
				break;
			case USER_UPDATE_PASSWORD_ACTION:
				draft.payload = payload;
				draft.fetching = true;
				break;
			case USER_UPDATE_CURRENT:
				console.log('state', state);
				// draft.payload = payload;
				// draft.fetching = true;
				break;
			default:
				return draft;
		}
	});

export default userProfileReducer;
