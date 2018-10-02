import React, { Fragment } from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

import { CssBaseline } from '@material-ui/core';

import store from './store';
import App from './components/App';

const root = document.getElementById('root');

ReactDOM.render(
  <Provider store={store}>
    <Fragment>
      <CssBaseline />
      <App />
    </Fragment>
  </Provider>
  , root);