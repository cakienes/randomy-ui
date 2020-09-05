import {takeLatest, put} from 'redux-saga/effects';
import {LOAD_DATA, FORTUNE_SEND} from './constants';
import {loadedData, loadData} from './actions';

import ApiStore from '../../utils/request';

export const loadDataSaga = function*(action) {
  try {
    const response = yield ApiStore.fortuneTeller.get();
    yield put(loadedData(response.data));
  } catch (e) {
    console.warn(e);
  }
};

const fortuneTellersSaga = function* fortuneTellersSaga() {
  yield takeLatest(LOAD_DATA, loadDataSaga);
};

export default fortuneTellersSaga;
