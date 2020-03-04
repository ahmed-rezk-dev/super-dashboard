import { api } from './Api';
const setAuthToken = (token, refreshToken) => {
	if (token) {
		api.defaults.headers.common['x-token'] = token;
		api.defaults.headers.common['x-refresh-token'] = refreshToken;

		// ({
		// 	'x-token': token,
		// 	'x-refresh-token': refreshToken,
		// });
		localStorage.setItem('x-token', token);
		localStorage.setItem('x-refresh-token', refreshToken);
	}
};

const removeAuthToken = () => {
	// Delete auth header
	delete api.defaults.headers.common['x-token'];
	delete api.defaults.headers.common['x-refresh-token'];
	localStorage.clear();
};

export { setAuthToken, removeAuthToken };
