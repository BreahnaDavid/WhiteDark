import { combineReducers } from 'redux';

import authReducer from './auth-reducer';
import navbarReducer from './navbar-reducer';
import formsReducer from './forms-Reducer';

export default combineReducers({
  authReducer,
  navbarReducer,
  formsReducer
});
