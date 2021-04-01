import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Root from './router/index';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import rootReducer from './reducers/index';
import reduxThunk from 'redux-thunk';

const store = createStore(rootReducer, applyMiddleware(reduxThunk));

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <Root />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);
