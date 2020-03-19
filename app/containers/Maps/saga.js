import { call, put, takeLatest, all } from 'redux-saga/effects';
import { message } from 'antd';
import Api from '../../utils/Api';
import { GET_PLACE_ACTION, GET_PLACE_REVERSE_ACTION } from './constants';
import { getPlaceSuccessAction, getPlaceReverseSuccessAction } from './actions';

// Get Place
function* getPlace({ payload }) {
	try {
		const { data } = yield call(Api.getPlace, payload);
		console.log('success:', data);
		yield put(getPlaceSuccessAction(data));
	} catch (error) {
		const { data } = error.response;
		console.log('error in maps api:', data);
		// message.error(data.msg);
	}
}

// Get Place Reverse
function* getPlaceReverse({ payload }) {
	try {
		const { data } = yield call(Api.getPlaceReverse, payload);
		yield put(getPlaceReverseSuccessAction(data));
	} catch (error) {
		const { data } = error.response;
		console.log('error in maps api:', data);
		// message.error(data.msg);
	}
}

// Individual exports for testing
export default function* rootSaga() {
	yield all([takeLatest(GET_PLACE_ACTION, getPlace)]);
	yield all([takeLatest(GET_PLACE_REVERSE_ACTION, getPlaceReverse)]);
}
