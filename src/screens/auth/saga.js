import {takeLatest, put} from 'redux-saga/effects';
import {LOGIN} from './constants';
import {setCurrentUser, setTokens} from './actions';

import ApiStore, {setTokenService} from '../../utils/request';

export const loginSaga = function*(action) {
  try {
    const response = yield ApiStore.auth.post('login', action.value);
    setTokenService(response.data.token);
    yield put(setCurrentUser(response.data.data));
    yield put(setTokens(response.data));
    action.successFunc();
  } catch (e) {
    action.errorFunc();
    console.warn(e);
  }
};

const authSaga = function* authSaga() {
  yield takeLatest(LOGIN, loginSaga);
};

export default authSaga;
