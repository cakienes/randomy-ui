import {fromJS} from 'immutable';
import {LOADED_DATA} from './types';

const initialState = fromJS({
  data: {},
});

export default function(state = initialState, action) {
  switch (action.type) {
    case LOADED_DATA:
      return state.set('data', action.value);
    default:
      return state;
  }
}
