import {combineReducers} from 'redux';
import {navReducer} from './navigations';

import homePageReducer from './screens/homepage/reducer';
import fortuneTellersReducer from './screens/fortuneTellers/reducer';
import authReducer from './screens/auth/reducer';
import fortuneSendReducer from './screens/fortuneSend/reducer';
import fortunesReducer from './screens/fortunes/reducer';

export default function getRootReducer() {
  return combineReducers({
    nav: navReducer,
    homepage: homePageReducer,
    fortuneTellers: fortuneTellersReducer,
    auth: authReducer,
    fortuneSend: fortuneSendReducer,
    fortunes: fortunesReducer,
  });
}
