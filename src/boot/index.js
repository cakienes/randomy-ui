import * as React from 'react';
import {Provider} from 'react-redux';
import configureStore from './configureStore';
import {StatusBar} from 'react-native';
import App from '../App';
const store = configureStore();

export default class Setup extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <Provider store={store}>
        <StatusBar hidden={false} backgroundColor={'#4F38A6'} />
        <App />
      </Provider>
    );
  }
}

export {store};
