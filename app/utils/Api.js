// a library to wrap and simplify api calls
import axios from 'axios';
import { message } from 'antd';
import history from './history';

// ------
// Configure an axios-based api object.
//-------
const baseURL = '/api/';
export const api = axios.create({
	// base URL is read from the "constructor"
	baseURL,
	// 10 second timeout...
	// timeout: 1000,
});

// Api interceptors
api.interceptors.response.use(
	response =>
		// Return a successful response back to the calling service
		response,
	error => {
		// Network Error Message
		if (error.message === 'Network Error') {
			message.success(error.message);
		}

		const {
			config,
			response: { status, data },
		} = error;
		const originalRequest = config;

		if (data.msg === 'TokenExpiredError') {
			originalRequest.headers['x-token'] = data.newToken;
			originalRequest.headers['x-refresh-token'] = data.newRefreshToken;
			return new Promise(resolve => {
				resolve(axios(originalRequest));
			});
		}

		// Errors Handler
		const statusCodes = [403, 405];
		if (statusCodes.includes(status)) {
			history.push('/error', { ...data, status });
		}

		return Promise.reject(error);
	}
);

// our "constructor"
const create = () => {
	// ------
	// STEP 2
	// ------
	//
	// Define some functions that call the api.  The goal is to provide
	// a thin wrapper of the api layer providing nicer feeling functions
	// rather than "get", "post" and friends.
	//
	// I generally don't like wrapping the output at this level because
	// sometimes specific actions need to be take on `403` or `401`, etc.
	//
	// Since we can't hide from that, we embrace it by getting out of the
	// way at this level.
	//
	const getRoot = () => api.get('');
	const getRate = () => api.get('rate_limit');
	const getUser = username => api.get('search/users', { q: username });
	// Auth
	const postLogin = data => api.post('login', data);
	const postForgetPasswordByEmail = data => api.post('forgot', data);
	const getCheckResetToken = data => api.get(`reset/${data}`);
	const postResetPassword = data => api.post(`reset/${data.token}`, data);
	// Roles
	const getRoles = () => api.get('roles');
	const addRoles = data => api.post('roles', data);
	const editRoles = data => api.put(`roles/${data._id}`, { name: data.name });
	const deleteRoles = data => api.delete(`roles/${data.id}`);

	// users
	const getUserProfile = data => api.get('user/profile', {}, { headers: data });
	const postUserUpdate = data => api.put(`users/${data._id}`, data.values);
	const postUserUpdateAvatar = data =>
		api.post(`users/update/user/avatar`, data);
	const postChangePassword = data => api.post('users/change/password', data);
	const postRegister = data => api.post('register', data);
	const getUserSettings = data => api.get('users/settings', data);
	const postOrderStore = data => api.post('orders/store', data);
	const postOrderRejection = data => api.post('orders/rejection', data);
	const postOrderSchedule = data => api.post('orders/schedule', data);
	const postOrderAcceptation = data => api.post('orders/acceptation', data);
	const postOrderUpdate = data => api.post('orders/update', data);
	const postOrderDestroy = data => api.post('orders/destroy', data);
	const getOrders = data => api.get('orders/index', data);
	const getWallets = data => api.get('wallets/index', data);
	const postWalletStore = data => api.post('wallets/store', data);
	const getNotifications = data => api.get('notifications/all', data);
	const getNotificationsRead = data => api.get('notifications/read', data);
	const getNotificationsRemoveAll = data =>
		api.get('notifications/remove/all', data);
	const postContactUs = data => api.post('contactUs', data);
	const getSiteSettings = data => api.get('site/settings', data);
	const phonesValidation = data => api.post('phones/validation', data);
	const getAccount = () => api.get('account');

	// Maps
	const getPlace = keyword =>
		api.get(
			`https://nominatim.openstreetmap.org/search?q=${keyword}&format=json&limit=5`
		);
	const getPlaceReverse = query =>
		api.get(
			`https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${query.lat}&lon=${query.lng}`
		);

	// ------
	// STEP 3
	// ------
	//
	// Return back a collection of functions that we would consider our
	// interface.  Most of the time it'll be just the list of all the
	// methods in step 2.
	//
	// Notice we're not returning back the `api` created in step 1?  That's
	// because it is scoped privately.  This is one way to create truly
	// private scoped goodies in JavaScript.
	//
	return {
		// a list of the API functions from step 2
		api,
		getRoot,
		getRate,
		getUser,
		postLogin,
		getUserProfile,
		postUserUpdate,
		postRegister,
		postChangePassword,
		getUserSettings,
		postOrderStore,
		postOrderRejection,
		postOrderSchedule,
		postOrderAcceptation,
		postOrderUpdate,
		postOrderDestroy,
		getOrders,
		getWallets,
		postWalletStore,
		getNotifications,
		getNotificationsRead,
		getNotificationsRemoveAll,
		postContactUs,
		getSiteSettings,
		phonesValidation,
		getAccount,
		postForgetPasswordByEmail,
		getCheckResetToken,
		postResetPassword,
		getRoles,
		addRoles,
		editRoles,
		deleteRoles,
		getPlace,
		getPlaceReverse,
		postUserUpdateAvatar,
	};
};

// let's return back our create method as the default.
export default create();
