import { takeLatest, all, call, put } from 'redux-saga/effects';
import {
	USER_UPDATE_ACTION,
	USER_UPDATE_AVATAR_ACTION,
} from 'containers/UserProfile/constants';
import Api from 'utils/Api';
import {
	userSuccessAction,
	userErrorAction,
} from 'containers/UserProfile/actions';
import { message } from 'antd';
import errorsHandler from 'utils/errorsHandler';
import { setCurrentUser } from 'containers/App/actions';
import { setAuthToken } from 'utils/Auth';
import JwtDecode from 'jwt-decode';

function* userUpdate({ payload }) {
	try {
		const { data } = yield call(Api.postUserUpdate, payload);
		message.success(data.msg);
		setAuthToken(data.token, data.refreshToken);
		const decodedToken = JwtDecode(data.token);
		yield all([
			put(userSuccessAction(data)),
			put(setCurrentUser(decodedToken)),
		]);
	} catch (error) {
		const { response } = error;
		errorsHandler(response);
		yield put(userErrorAction(response.data));
	}
}

function* userUpdateAvatar({ payload }) {
	try {
		const { data } = yield call(Api.userUpdateAvatar, payload);
		const { msg, token, refreshToken } = data;
		message.success(msg);

		setAuthToken(token, refreshToken);
		const decodedToken = JwtDecode(token);
		const userToAddToRedux = { ...decodedToken, token, refreshToken };

		yield all([
			put(userSuccessAction(data)),
			put(setCurrentUser(userToAddToRedux)),
		]);
	} catch (error) {
		const { response } = error;
		errorsHandler(response);
		yield put(userErrorAction(response.data));
	}
}

// Individual exports for testing
export default function* userProfileSaga() {
	yield all([
		takeLatest(USER_UPDATE_ACTION, userUpdate),
		takeLatest(USER_UPDATE_AVATAR_ACTION, userUpdateAvatar),
	]);
}
