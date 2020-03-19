/*
 *
 * Map reducer
 *
 */
import produce from 'immer';
import {
	GET_PLACE_ACTION,
	GET_PLACE_SUCCESS_ACTION,
	GET_PLACE_ERROR_ACTION,
	GET_PLACE_REVERSE_ACTION,
	GET_PLACE_LOADING_ACTION,
	GET_PLACE_REVERSE_SUCCESS_ACTION,
} from './constants';

export const initialState = {
	fetching: false,
	payload: null,
	data: [],
	placesList: [],
	currentAddress: {
		lat: -34,
		lon: 151,
		display_name: '',
		address: {
			city: '',
			county: '',
			state: '',
			postcode: '',
			country: '',
		},
	},
	initialPosition: {
		lat: -34,
		lon: 151,
	},
	initialCenter: [-34, 151],
	msg: null,
	error: false,
};

/* eslint-disable default-case, no-param-reassign */
const mapReducer = (state = initialState, action) =>
	produce(state, draft => {
		const { type, data, msg, payload, fetching, currentAddress } = action;
		switch (type) {
			case GET_PLACE_ACTION:
				draft.payload = payload;
				draft.fetching = true;
				break;
			case GET_PLACE_SUCCESS_ACTION:
				draft.payload = null;
				draft.data = data;
				draft.placesList = data.map(palce => ({ value: palce.display_name }));
				draft.fetching = false;
				break;
			case GET_PLACE_REVERSE_ACTION:
				draft.payload = payload;
				draft.fetching = true;
				break;
			case GET_PLACE_REVERSE_SUCCESS_ACTION:
				draft.currentAddress = currentAddress;
				draft.fetching = false;
				break;
			case GET_PLACE_ERROR_ACTION:
				draft.msg = msg;
				draft.data = null;
				draft.fetching = false;
				break;
			case GET_PLACE_LOADING_ACTION:
				draft.fetching = fetching;
				break;
			default:
				return draft;
		}
	});

export default mapReducer;
