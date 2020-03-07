/*
 *
 * UserProfile reducer
 *
 */
import produce from 'immer';
import { DEFAULT_ACTION } from './constants';

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
		const { type, data, payload } = action;
		switch (action.type) {
			case DEFAULT_ACTION:
				break;
			default:
				return draft;
		}
	});

export default userProfileReducer;
