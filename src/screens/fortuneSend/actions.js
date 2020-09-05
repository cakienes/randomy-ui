import {FORTUNE_SEND} from './constants';

export function fortuneSend(value, successFunc) {
  return {
    type: FORTUNE_SEND,
    value,
    successFunc,
  };
}
