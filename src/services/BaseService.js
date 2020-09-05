/** Dependencies */
import axios from 'axios';
import {AsyncStorage} from 'react-native';

class BaseService {
  constructor(baseURL) {
    this.baseURL = baseURL;

    AsyncStorage.getItem('jwt').then(token => {
      this.jwt = token;
    });
  }

  failureInterceptor = error => {
    return Promise.reject(error);
  };

  createAxiosInstance = () => {
    const instance = axios.create({
      headers: {Authorization: `Bearer ${this.jwt}`},
      validateStatus: status =>
        status >= 200 && status <= 500 && status !== 401,
      baseURL: this.baseURL,
    });

    instance.interceptors.response.use(
      response => response,
      this.failureInterceptor,
    );

    return instance;
  };

  get = (url = '', ...params) => {
    const axiosInstance = this.createAxiosInstance();
    return axiosInstance.get(this.baseURL + url, ...params);
  };

  post(url = '', ...params) {
    const axiosInstance = this.createAxiosInstance();
    return axiosInstance.post(this.baseURL + url, ...params);
  }

  put(url = '', ...params) {
    const axiosInstance = this.createAxiosInstance();
    return axiosInstance.put(this.baseURL + url, ...params);
  }

  delete(url = '', ...params) {
    const axiosInstance = this.createAxiosInstance();
    return axiosInstance.delete(this.baseURL + url, ...params);
  }

  patch(url = '', ...params) {
    const axiosInstance = this.createAxiosInstance();
    return axiosInstance.patch(this.baseURL + url, ...params);
  }
}

export default BaseService;
