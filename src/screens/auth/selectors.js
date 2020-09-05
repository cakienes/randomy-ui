import {createSelector} from 'reselect';
import {fromJS} from 'immutable';

const selectAuthDomain = () => state => state.auth;

const makeSelectAuth = () =>
  createSelector(selectAuthDomain(), substate => substate.toJS());

export const makeSelectCurrentUser = () =>
  createSelector(selectAuthDomain(), substate => substate.toJS().currentUser);

export default makeSelectAuth;
