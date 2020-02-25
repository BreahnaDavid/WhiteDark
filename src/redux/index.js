import { combineReducers } from 'redux';

import authReducer from './auth-reducer';
import navbarReducer from './navbar-reducer';

export default combineReducers({
  authReducer,
  navbarReducer
});
