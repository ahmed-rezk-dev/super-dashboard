/*
 *
 * Roles reducer
 *
 */
import produce from 'immer';
import {
	ROLES_REQUEST,
	ROLES_SUCCESS,
	ROLES_ADD,
	ROLES_EDIT,
	ROLES_DELETE,
	ROLES_ADD_SUCCESS,
	ROLES_EDIT_SUCCESS,
	ROLES_DELETE_SUCCESS,
	ROLES_ERROR,
	TOGGLE_ADD_MODAL,
	TOGGLE_EDIT_MODAL,
} from './constants';

export const initialState = {
	fetching: false,
	isLoading: false,
	error: false,
	payload: null,
	msg: null,
	data: [],
	toggleAddModal: false,
	toggleEditModal: false,
	form: 'roles',
};

/* eslint-disable default-case, no-param-reassign */
const rolesReducer = (state = initialState, action) =>
	produce(state, draft => {
		const { type, data, payload } = action;
		switch (type) {
			case ROLES_REQUEST:
				return { ...state, fetching: true, payload: null };
			case ROLES_SUCCESS:
				draft.data = data;
				draft.fetching = false;
				draft.isLoading = false;
				break;
			case ROLES_ERROR:
				draft.isLoading = false;
				draft.payload = payload;
				draft.error = true;
				break;
			case ROLES_ADD:
				draft.payload = payload;
				draft.isLoading = true;
				break;
			case ROLES_ADD_SUCCESS:
				draft.data.push(payload.data);
				draft.msg = payload.msg;
				draft.isLoading = false;
				break;
			case ROLES_EDIT:
				draft.payload = payload;
				draft.isLoading = true;
				break;
			case ROLES_EDIT_SUCCESS:
				draft.data[payload.index] = payload.doc;
				draft.isLoading = false;
				break;
			case ROLES_DELETE:
				draft.payload = payload;
				draft.isLoading = true;
				break;
			case ROLES_DELETE_SUCCESS:
				delete draft.data.splice(payload.index, 1);
				draft.isLoading = false;
				break;
			case TOGGLE_ADD_MODAL:
				draft.toggleAddModal = !state.toggleAddModal;
				break;
			case TOGGLE_EDIT_MODAL:
				draft.toggleEditModal = !state.toggleEditModal;
				break;
			default:
				return draft;
		}
	});

export default rolesReducer;
