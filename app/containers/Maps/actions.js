/*
 *
 * MapTest actions
 *
 */

import {
	GET_PLACE_ACTION,
	GET_PLACE_SUCCESS_ACTION,
	GET_PLACE_ERROR_ACTION,
	GET_PLACE_REVERSE_ACTION,
	GET_PLACE_LOADING_ACTION,
	GET_PLACE_REVERSE_SUCCESS_ACTION,
} from './constants';

export function getPlaceAction(payload) {
	return {
		type: GET_PLACE_ACTION,
		payload,
	};
}
export function getPlaceSuccessAction(data) {
	return {
		type: GET_PLACE_SUCCESS_ACTION,
		data,
	};
}
export function getPlaceReverseAction(payload) {
	return {
		type: GET_PLACE_REVERSE_ACTION,
		payload,
	};
}
export function getPlaceReverseSuccessAction(currentAddress) {
	return {
		type: GET_PLACE_REVERSE_SUCCESS_ACTION,
		currentAddress,
	};
}
export function getPlaceErrorAction(payload) {
	return {
		type: GET_PLACE_ERROR_ACTION,
		payload,
	};
}
export function getPlaceLoadingAction(fetching) {
	return {
		type: GET_PLACE_LOADING_ACTION,
		fetching,
	};
}
