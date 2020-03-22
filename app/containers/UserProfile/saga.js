import { takeLatest, all, call, put } from 'redux-saga/effects';
import { USER_UPDATE_ACTION } from 'containers/UserProfile/constants';
import Api from 'utils/Api';
import { userSuccessAction } from 'containers/UserProfile/actions';
import { message } from 'antd';

function* userUpdate(payload) {
	try {
		const { data, msg } = yield call(Api.postUserUpdate, payload);
		yield put(userSuccessAction(data));
		message.success(msg);
	} catch (err) {
		const { data } = err.response;
		message.error(data.msg);
	}
}
// Individual exports for testing
export default function* userProfileSaga() {
	yield all([takeLatest(userUpdate, USER_UPDATE_ACTION)]);
}

