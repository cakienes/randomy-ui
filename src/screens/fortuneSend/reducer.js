import {fromJS} from 'immutable';
import {} from './constants';

const initialState = fromJS({
  list: [],
});

export default function(state = initialState, action) {
  switch (action.type) {
    default:
      return state;
  }
}
