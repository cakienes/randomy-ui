import {createSelector} from 'reselect';
import {fromJS} from 'immutable';

const selectFortuneSendDomain = () => state => state.fortuneSend;

const makeSelectFortuneSend = () =>
  createSelector(selectFortuneSendDomain(), substate => substate.toJS());

export default makeSelectFortuneSend;
