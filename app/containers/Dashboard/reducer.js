/*
 *
 * Dashboard reducer
 *
 */
import produce from 'immer';
import { GET_ACCOUNT_REQUEST } from './constants';

export const initialState = {};

/* eslint-disable default-case, no-param-reassign */
const dashboardReducer = (state = initialState, action) =>
	produce(state, (/* draft */) => {
		switch (action.type) {
			case GET_ACCOUNT_REQUEST:
				break;
		}
	});

export default dashboardReducer;
