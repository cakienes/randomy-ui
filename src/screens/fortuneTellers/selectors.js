import {createSelector} from 'reselect';
import {fromJS} from 'immutable';

const selectFortuneTellersDomain = () => state => state.fortuneTellers;

const makeSelectFortuneTellers = () =>
  createSelector(
    selectFortuneTellersDomain(),
    substate => substate.toJS(),
  );

export default makeSelectFortuneTellers;
