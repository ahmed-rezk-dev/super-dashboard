/**
 *
 * App.js
 *
 * This component is the skeleton around the actual pages, and should only
 * contain code that should be seen on all pages. (e.g. navigation bar)
 *
 */

import { Switch, Route } from 'react-router-dom';
import React from 'react';
import jwtDecode from 'jwt-decode';

import { setAuthToken, removeAuthToken } from 'utils/Auth';
import history from 'utils/history';
import Dashboard from 'containers/Dashboard/Loadable';
import HomePage from 'containers/MainPage/Loadable';
import LoginPage from 'containers/Login/index';
import NotFoundPage from 'containers/NotFoundPage/Loadable';
import PrivateRoute from 'PrivateRoute';
import 'antd/dist/antd.css';
import Example from 'components/Example';
import { ThemeProvider } from 'styled-components';
import Maps from 'containers/Maps/index';
import theme, { GlobalStyle } from '../../assets/styles/theme';
import { setCurrentUser } from './actions';
import configureStore from '../../configureStore';

const store = configureStore();

// Check for token to keep user logged in
if (localStorage['x-token']) {
	// Set auth token header auth
	const token = localStorage['x-token'];
	const refreshToken = localStorage['x-refresh-token'];
	setAuthToken(token, refreshToken);
	// Decode token and get user info and exp
	const decodedToken = jwtDecode(refreshToken);
	// Set user and isAuthenticated
	store.dispatch(setCurrentUser(decodedToken));
	// Check for expired token
	const currentTime = Date.now() / 1000; // to get in milliseconds
	const expDate = decodedToken.exp;
	if (expDate < currentTime) {
		// Logout user
		removeAuthToken();
		store.dispatch(setCurrentUser(null));
		// Redirect to login
		history.go('auth/login');
	}
}

export default function App() {
	return (
		<div>
			<ThemeProvider theme={theme}>
				<GlobalStyle />
				<Route
					render={({ location }) => (
						<Switch location={location}>
							<Route exact path="/" component={LoginPage} />
							<Route path="/example" component={Example} />
							<Route path="/auth/" component={LoginPage} />
							<PrivateRoute path="/admin" component={HomePage} />
							<PrivateRoute path="/dashboard" component={Dashboard} />
							<Route path="/maps" component={Maps} />
							<Route path="/error" component={NotFoundPage} />
							<Route component={NotFoundPage} />
						</Switch>
					)}
				/>
			</ThemeProvider>
		</div>
	);
}
