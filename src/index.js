import React from 'react';
import { Provider } from 'react-redux';
import { render } from 'react-dom';
require('bootstrap/dist/css/bootstrap.css');

import AppContainer from './containers/AppContainer';
import store from './store';

render(
  <Provider store={store}>
    <AppContainer />
  </Provider>,
  document.getElementById('app')
);
