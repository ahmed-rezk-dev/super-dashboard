/*
 *
 * Roles actions
 *
 */

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

export function rolesRequest() {
	return {
		type: ROLES_REQUEST,
	};
}

export function rolesSuccess(data) {
	return {
		type: ROLES_SUCCESS,
		data,
	};
}

export function rolesError(payload) {
	return {
		type: ROLES_ERROR,
		payload,
	};
}

export function rolesAdd(payload) {
	return {
		type: ROLES_ADD,
		payload,
	};
}
export function rolesAddSuccess(payload) {
	return {
		type: ROLES_ADD_SUCCESS,
		payload,
	};
}

export function rolesEdit(payload) {
	return {
		type: ROLES_EDIT,
		payload,
	};
}

export function rolesEditSuccess(payload) {
	return {
		type: ROLES_EDIT_SUCCESS,
		payload,
	};
}

export function rolesDelete(payload) {
	return {
		type: ROLES_DELETE,
		payload,
	};
}
export function rolesDeleteSuccess(payload) {
	return {
		type: ROLES_DELETE_SUCCESS,
		payload,
	};
}

export function toggleAddModal() {
	return {
		type: TOGGLE_ADD_MODAL,
	};
}

export function toggleEditModal() {
	return {
		type: TOGGLE_EDIT_MODAL,
	};
}
