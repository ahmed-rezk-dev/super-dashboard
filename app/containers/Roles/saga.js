import { call, put, takeLatest, all } from 'redux-saga/effects';
import { message } from 'antd';
import {
	ROLES_REQUEST,
	ROLES_DELETE,
	ROLES_EDIT,
	ROLES_ADD,
} from './constants';
import Api from '../../utils/Api';
import {
	rolesSuccess,
	rolesAddSuccess,
	rolesEditSuccess,
	rolesDeleteSuccess,
	rolesError,
	toggleAddModal,
	toggleEditModal,
} from './actions';

// FETCH
function* fetchRoles() {
	const response = yield call(Api.getRoles);
	yield put(rolesSuccess(response.data.data));
}

// ADD
function* addRoles({ payload }) {
	try {
		const { data } = yield call(Api.addRoles, payload);
		yield put(rolesAddSuccess(data));
		yield put(toggleAddModal());
		message.success(data.msg);
	} catch (error) {
		const { data } = error.response;
		yield put(rolesError());
		message.error(data.msg);
	}
}

// EDIT
function* editRoles({ payload }) {
	try {
		const { data } = yield call(Api.editRoles, payload);
		yield put(rolesEditSuccess({ doc: data.doc, index: payload.index }));
		message.success(data.msg);
		yield put(toggleEditModal());
	} catch (error) {
		const { data } = error.response;
		yield put(rolesError());
		message.error(data.msg);
	}
}

// DELETE
function* deleteRoles({ payload }) {
	try {
		const { data } = yield call(Api.deleteRoles, payload);
		yield put(rolesDeleteSuccess({ index: payload.index }));
		message.success(data.msg);
	} catch (error) {
		const { data } = error.response;
		yield put(rolesError());
		message.error(data.msg);
	}
}

// Individual exports for testing
export default function* rootSaga() {
	yield all([
		takeLatest(ROLES_REQUEST, fetchRoles),
		takeLatest(ROLES_ADD, addRoles),
		takeLatest(ROLES_EDIT, editRoles),
		takeLatest(ROLES_DELETE, deleteRoles),
	]);
}
