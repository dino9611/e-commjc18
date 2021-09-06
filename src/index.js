//? react
import React from 'react';
import ReactDOM from 'react-dom';
//? router
import { BrowserRouter } from 'react-router-dom';
//? redux
import reducers from './states/reducers';
import { Provider } from 'react-redux';
import { createStore } from 'redux';

import App from './App';
const store = createStore(reducers);
ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>,
  document.getElementById('root')
);
