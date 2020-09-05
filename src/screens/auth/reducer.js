import {fromJS} from 'immutable';
import {SET_CURRENT_USER, SET_TOKENS} from './constants';
import {AsyncStorage} from 'react-native';
import {setTokenService} from '../../utils/request';

const initialState = fromJS({
  currentUser: {},
});

export default function(state = initialState, action) {
  switch (action.type) {
    case SET_CURRENT_USER:
      AsyncStorage.setItem('currentUser', JSON.stringify(action.value));
      return state.set('currentUser', action.value);
    case SET_TOKENS:
      alert('REDUCER' + action.value.token);
      const tokens = {
        refreshToken: action.value.refreshToken,
        token: action.value.token,
      };
      setTokenService(tokens);

    default:
      return state;
  }
}
