import AsyncStorage from '@react-native-community/async-storage';
/** Services */
import ApiService from '../../services/ApiService';
import {setCurrentUser} from './actions';

export const anonymousLogin = () => async dispatch => {
  return new Promise((resolve, reject) => {
    const dumData = {
      Gender: 'M',
      Birthday: '1992-10-23T13:00:00',
    };
    ApiService.anonymousLogin(dumData)
      .then(response => {
        debugger;
        if (response.data) {
          AsyncStorage.setItem('jwt', response.data.token);
          dispatch(setCurrentUser(response.data.user));
          resolve();
        } else {
          reject();
        }
      })
      .catch(error => {
        reject();
      });
  });
};
