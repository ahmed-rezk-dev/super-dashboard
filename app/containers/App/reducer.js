/*
 * AppReducer
 *
 * The reducer takes care of our data. Using actions, we can
 * update our application state. To add a new action,
 * add it to the switch statement in the reducer function
 *
 */

import jwtDecode from 'jwt-decode';
import produce from 'immer';

import {
	LOAD_REPOS_SUCCESS,
	LOAD_REPOS,
	LOAD_REPOS_ERROR,
	SET_CURRRENT_USER,
	SET_CURRENT_ROUTE,
} from './constants';

const token = localStorage['x-refresh-token'];
// Decode token and get user info and exp
const decodedToken = token != null ? jwtDecode(token) : null;

// The initial state of the App
export const initialState = {
	loading: false,
	error: false,
	auth: {
		isAuthenticated: token != null,
		user: decodedToken,
	},
	currentRoute: {
		path: '',
		group: {},
		name: '',
		rtlName: '',
		icon: '',
	},
};

/* eslint-disable default-case, no-param-reassign */
const appReducer = (state = initialState, action) =>
	produce(state, draft => {
		switch (action.type) {
			case SET_CURRRENT_USER:
				draft.auth.isAuthenticated = action.payload != null;
				draft.auth.user = action.payload;
				break;

			case SET_CURRENT_ROUTE:
				draft.currentRoute = action.payload;
				break;

			case LOAD_REPOS:
				draft.loading = true;
				draft.error = false;
				draft.userData.repositories = false;
				break;

			case LOAD_REPOS_SUCCESS:
				draft.userData.repositories = action.repos;
				draft.loading = false;
				draft.currentUser = action.username;
				break;

			case LOAD_REPOS_ERROR:
				draft.error = action.error;
				draft.loading = false;
				break;
		}
	});

export default appReducer;
