import {takeLatest, put} from 'redux-saga/effects';
import {FORTUNE_SEND} from './constants';
import {} from './actions';
import {loadData} from '../fortuneTellers/actions';

import ApiStore from '../../utils/request';

export const fortuneSend = function*(action) {
  try {
    const response = yield ApiStore.fortune.post('FortuneSend', action.value);
    yield put(loadData());
    action.successFunc();
  } catch (e) {
    console.warn(e);
  }
};

const fortuneSendSaga = function* fortuneSendSaga() {
  yield takeLatest(FORTUNE_SEND, fortuneSend);
};

export default fortuneSendSaga;
