import { takeLatest, all, call, put } from 'redux-saga/effects';
import { USER_UPDATE_ACTION } from 'containers/UserProfile/constants';
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
	} catch (err) {
		const { response } = err;
		errorsHandler(response);
		yield put(userErrorAction(response.data));
	}
}
// Individual exports for testing
export default function* userProfileSaga() {
	yield all([takeLatest(USER_UPDATE_ACTION, userUpdate)]);
}
