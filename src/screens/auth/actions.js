import {
  LOGIN,
  ANONYMOUS_LOGIN,
  SET_CURRENT_USER,
  SET_TOKENS,
} from './constants';

export const anonymousLogin = () => ({
  type: ANONYMOUS_LOGIN,
});

export const login = (value, successFunc, errorFunc) => ({
  type: LOGIN,
  value,
  successFunc,
  errorFunc,
});

export const setCurrentUser = value => ({
  type: SET_CURRENT_USER,
  value,
});

export const setTokens = value => ({
  type: SET_TOKENS,
  value,
});
