import React from 'react';
import { Provider } from 'react-redux';
import store from './src/reducers';
import Navigator from './src/routes';

export default () => (
  <Provider store={store}>
    <Navigator />
  </Provider>
);