/** Dependencies */
import BaseService from './BaseService';
import {API_URL} from '../../env.js';

class ApiService {
  constructor() {
    this.baseService = new BaseService(API_URL);
  }

  anonymousLogin = params => {
    return this.baseService.post('/auth/anonymous-login', params);
  };
}

export default new ApiService();
