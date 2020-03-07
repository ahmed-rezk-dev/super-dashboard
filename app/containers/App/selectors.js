import { createSelector } from 'reselect';
import { initialState } from './reducer';

const selectGlobal = state => state.global || initialState;

const selectRouter = state => state.router;

const makeSelectLocation = () =>
	createSelector(
		selectRouter,
		routerState => routerState.location,
	);

const makeSelectAuth = () =>
	createSelector(
		selectGlobal,
		globalState => globalState.auth,
	);

export { selectGlobal, makeSelectAuth, makeSelectLocation };
