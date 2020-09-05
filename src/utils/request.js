import axios from 'axios';
import {API_URL} from '../../env.js';
import {AsyncStorage} from 'react-native';

const baseURL = API_URL;
const token = null;

var setTokenService = tokens => {
  axios.defaults.headers.common['Authorization'] = `Bearer ${tokens.token}`;
  AsyncStorage.setItem('tokens', JSON.stringify(tokens));
};

var setNullTokenService = () => {
  axios.defaults.headers.common['Authorization'] = ``;
};

export var myInterceptorSuccess = function(response) {
  if (response.status == 200) {
    return response;
  }
};

export var myInterceptorError = async function(error) {
  const originalRequest = error.config;
  if (error.response.status === 401 && !originalRequest._retry) {
    originalRequest._retry = true;
    var tokens = await AsyncStorage.getItem('tokens');
    if (tokens != null) {
      tokens = JSON.parse(tokens);
      console.log(tokens);
      return axios
        .post(`${baseURL}/auth/RefreshToken`, {
          refreshToken: tokens.refreshToken,
          token: tokens.token,
        })
        .then(res => {
          console.warn(res);
          if (res.status === 200) {
            // 1) put token to LocalStorage
            const tokens = {
              refreshToken: res.data.refreshToken,
              token: res.data.token,
            };

            AsyncStorage.setItem('tokens', JSON.stringify(tokens));

            // 2) Change Authorization header
            AsyncStorage.getItem('tokens').then(tokens => {
              axios.defaults.headers.common['Authorization'] =
                'Bearer ' + tokens.token;

              // 3) return originalRequest object with Axios.
              return axios(originalRequest);
            });
          }
        })
        .catch(() => {
          console.warn('[Error: RefreshToken Invalid]');
        });
    }
  }
  throw (error = {
    message: 'ERROR_FROM_INTERCEPTOR' + error,
  });
};

const createAxios = url =>
  axios.create({
    baseURL: `${baseURL}/${url}`,
    timeout: 5000,
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
    },
    validateStatus: function(status) {
      return status == 200;
    },
  });
/*
var organisation = createAxios("Organisation");
organisation.interceptors.response.use(
  myInterceptorSuccess,
  myInterceptorError
);
*/
var fortuneTeller = createAxios('FortuneTeller');
fortuneTeller.interceptors.response.use(
  myInterceptorSuccess,
  myInterceptorError,
);
console.log(fortuneTeller);

var auth = createAxios('Auth');
auth.interceptors.response.use(myInterceptorSuccess, myInterceptorError);

var fortune = createAxios('Fortune');
fortune.interceptors.response.use(myInterceptorSuccess, myInterceptorError);

var ApiStore = {
  //organisation: organisation
  fortuneTeller: fortuneTeller,
  auth: auth,
  fortune: fortune,
};
export {setTokenService, setNullTokenService};
export default ApiStore;
