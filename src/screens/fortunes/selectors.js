import {createSelector} from 'reselect';
import {fromJS} from 'immutable';

const selectFortunesDomain = () => state => state.fortunes;

const makeSelectFortunes = () =>
  createSelector(selectFortunesDomain(), substate => substate.toJS());

export default makeSelectFortunes;
