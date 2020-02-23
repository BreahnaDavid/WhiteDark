import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import ThunkMiddleware from 'redux-thunk';

import rootReducer from './redux';
import App from './App';
import { setAuthUserData, setAuthUserStatus } from './redux/auth-reducer';
import * as serviceWorker from './serviceWorker';
import { userAPI } from './api';

const store = createStore(rootReducer, applyMiddleware(ThunkMiddleware));

userAPI.userCheckAuth().then(res => {
  if (res.data.login) store.dispatch(setAuthUserData({ ...res.data }));
  store.dispatch(setAuthUserStatus(res.data.status));
});

ReactDOM.render(
  <Provider store={store}>
    <Router>
      <App />
    </Router>
  </Provider>,
  document.getElementById('root')
);

serviceWorker.unregister();
