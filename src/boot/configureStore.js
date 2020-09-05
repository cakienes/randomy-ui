import {createStore, applyMiddleware} from 'redux';
import logger from 'redux-logger';
import thunk from 'redux-thunk';
import getRootReducer from '../reducers';

export default function configureStore() {
  const middlewares = [thunk];
  if (process.env.NODE_ENV == 'development') {
    middlewares.push(logger);
  }

  const store = createStore(
    getRootReducer(),
    {},
    applyMiddleware(...middlewares),
  );

  return store;
}
