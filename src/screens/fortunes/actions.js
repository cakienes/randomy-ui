import {LOAD_FORTUNES, LOADED_FORTUNES} from './constants';

export function loadFortunes() {
  return {
    type: LOAD_FORTUNES,
  };
}

export function loadedFortunes(value) {
  return {
    type: LOADED_FORTUNES,
    value,
  };
}
