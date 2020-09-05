import {fromJS} from 'immutable';
import {LOADED_DATA} from './constants';

const initialState = fromJS({
  list: [],
});

export default function(state = initialState, action) {
  switch (action.type) {
    case LOADED_DATA:
      return state.set('list', action.value);
    default:
      return state;
  }
}
