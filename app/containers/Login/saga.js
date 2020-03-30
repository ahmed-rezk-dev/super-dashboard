import { call, put, all, takeLatest } from 'redux-saga/effects';
import jwtDecode from 'jwt-decode';
import { setAuthToken } from 'utils/Auth';
import { message } from 'antd';
import {
	CHECK_RESET_TOKEN,
	FORGET_PASSWORD_REQUEST,
	LOGIN_REQUEST,
	RESET_PASSWORD,
} from './constants';
import { changeForm, loginError, loginSuccess } from './actions';
import { setCurrentUser } from '../App/actions';
import Api from '../../utils/Api';
import history from '../../utils/history';

message.config({
	top: 250,
});

// login
function* login(action) {
	try {
		const response = yield call(Api.postLogin, action.payload);
		const { data } = response;
		const { token, refreshToken, msg } = data;
		setAuthToken(token, refreshToken);
		const decodedToken = jwtDecode(token);
		const userToAddToRedux = { ...decodedToken, token, refreshToken };
		message.success(msg);
		yield all([put(loginSuccess(data)), put(setCurrentUser(userToAddToRedux))]);
		setTimeout(() => {
			history.push('/admin/dashboard');
		}, 1000);
	} catch (err) {
		const { data } = err.response;
		yield put(loginError(data));
		if (data.status === 'error') {
			message.error(data.msg, 10);
		}
	}
}

// forget Password ByE mail
function* forgetPasswordByEmail(action) {
	try {
		const response = yield call(Api.postForgetPasswordByEmail, action.payload);
		const { data } = response;

		message.success(data.msg, 15);
		yield all([put(loginSuccess()), put(changeForm(''))]);
		window.location.hash = '';
	} catch (err) {
		const { data } = err.response;
		yield put(loginError(data));
		if (data.status === 'error') {
			message.error(data.msg, 15);
		}
	}
}

// check Reset Token
function* checkResetToken(action) {
	try {
		yield call(Api.getCheckResetToken, action.payload);
		yield put(loginSuccess());
	} catch (err) {
		const { data } = err.response;
		yield put(loginError(data));
		if (data.status === 'error') {
			message.error(data.msg, 15);
			yield put(changeForm('login'));
		}
	}
}

// reset Password
function* resetPassword(action) {
	try {
		const response = yield call(Api.postResetPassword, action.payload);
		const { data } = response;
		message.success(data.msg, 15);
		yield all([put(changeForm('login')), put(loginSuccess(data))]);
	} catch (err) {
		const { data } = err.response;
		yield put(loginError(data));
		if (data.status === 'error') {
			message.error(data.msg, 15);
		}
	}
}

/**
 * Root saga manages watcher lifecycle
 */
// Root saga
export default function* rootSaga() {
	// if necessary, start multiple sagas at once with `all`
	yield all([
		takeLatest(LOGIN_REQUEST, login),
		takeLatest(FORGET_PASSWORD_REQUEST, forgetPasswordByEmail),
		takeLatest(CHECK_RESET_TOKEN, checkResetToken),
		takeLatest(RESET_PASSWORD, resetPassword),
	]);
}
