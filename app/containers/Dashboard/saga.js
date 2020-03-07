import { call, put, all, takeLatest } from 'redux-saga/effects';

import { GET_ACCOUNT_REQUEST } from './constants';
import Api from '../../utils/Api';
import history from '../../utils/history';

function* getAccount() {
	try {
		const response = yield call(Api.getAccount);
		console.log('response', response);
	} catch (e) {
		console.log('Catch Error =>> get account function => login saga :', e);
	}
}

/**
 * Root saga manages watcher lifecycle
 */

function* actionWatcher() {
	yield takeLatest(GET_ACCOUNT_REQUEST, getAccount);
}

// Root saga
export default function* rootSaga() {
	// if necessary, start multiple sagas at once with `all`
	yield all([actionWatcher()]);
}
