import {takeLatest, put} from 'redux-saga/effects';
import {LOAD_FORTUNES} from './constants';
import {loadedFortunes} from './actions';

import ApiStore from '../../utils/request';

export const loadFortunesSaga = function*(action) {
  try {
    const response = yield ApiStore.fortune.get();
    yield put(loadedFortunes(response.data));
  } catch (e) {
    console.warn(e);
  }
};

const fortuneSaga = function* fortuneSaga() {
  yield takeLatest(LOAD_FORTUNES, loadFortunesSaga);
};

export default fortuneSaga;
