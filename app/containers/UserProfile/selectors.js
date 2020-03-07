import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the userProfile state domain
 */

const selectUserProfileDomain = state => state.userProfile || initialState;
const selectUserOFGlobal = state => state.global.auth.user || initialState;

/**
 * Other specific selectors
 */

/**
 * Default selector used by UserProfile
 */

const makeSelectUserProfile = () =>
	createSelector(selectUserOFGlobal, substate => substate);

export default makeSelectUserProfile;
export { selectUserProfileDomain };
