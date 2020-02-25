import { userAPI } from '../api';

const SET_AUTH_USER_DATA = 'SET_AUTH_USER_DATA';
const SET_AUTH_USER_STATUS = 'SET_AUTH_USER_STATUS';
const DELETE_AUTH_USER_DATA = 'DELETE_AUTH_USER_DATA';
const CLEAR_AUTH_USER_STATUS = 'CLEAR_AUTH_USER_STATUS';
const SET_USER_DATA = 'SET_USER_DATA';

const initialState = {
  nickname: null,
  id: null,
  email: null,
  login: false,
  status: '',
  firstname: '',
  lastname: '',
  gender: '',
  country: '',
  dateOfBirth: ''
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_AUTH_USER_DATA: {
      return { ...state, ...action.data };
    }
    case SET_AUTH_USER_STATUS: {
      return { ...state, status: action.status };
    }
    case DELETE_AUTH_USER_DATA: {
      return { ...state, ...action.data };
    }
    case CLEAR_AUTH_USER_STATUS: {
      return { ...state, status: '' };
    }
    case SET_USER_DATA: {
      return { ...state, ...action.data };
    }
    default:
      return state;
  }
};
export const deleteAuthUserData = () => ({
  type: DELETE_AUTH_USER_DATA,
  data: { ...initialState }
});
export const setAuthUserData = data => ({
  type: SET_AUTH_USER_DATA,
  data
});
export const setUserData = data => ({
  type: SET_USER_DATA,
  data
});
export const clearAuthUserStatus = () => ({
  type: CLEAR_AUTH_USER_STATUS
});

export const setAuthUserStatus = status => ({
  type: SET_AUTH_USER_STATUS,
  status
});

export const changePasswordThunkCreator = data => {
  return dispatch => {
    userAPI.changePassword(data).then(res => {
      dispatch(setAuthUserStatus(res.data.status));
    });
  };
};
export const changeEmailThunkCreator = data => {
  return dispatch => {
    userAPI.changeEmail(data).then(res => {
      dispatch(setAuthUserStatus(res.data.status));
    });
  };
};

export const loginUserThunkCreator = (email, password) => {
  return dispatch => {
    userAPI.userLogin(email, password).then(res => {
      if (res.data.login) dispatch(setAuthUserData({ ...res.data }));
    });
  };
};
export const clearAuthUserStatusThunkCreator = () => {
  return dispatch => {
    dispatch(clearAuthUserStatus());
  };
};

export const logoutUserThunkCreator = () => {
  return dispatch => {
    userAPI.userLogout().then(res => {
      dispatch(deleteAuthUserData());
    });
  };
};

export const checkAuthUserThunkCreator = () => {
  return dispatch => {
    userAPI.userCheckAuth().then(res => {
      if (res.data.login) dispatch(setAuthUserData({ ...res.data }));
    });
  };
};

export const registerUserThunkCreator = data => {
  return dispatch => {
    userAPI.userRegister(data).then(res => {
      if (res.data.login) dispatch(setAuthUserData({ ...res.data }));
    });
  };
};

export const deleteAccount = password => {
  return dispatch => {
    userAPI.deleteAccount(password).then(res => {
      dispatch(deleteAuthUserData());
    });
  };
};

export const setUserDataThunkCreator = data => {
  return dispatch => {
    userAPI.updateUserData(data).then(res => {
      dispatch(setUserData({ ...res.data }));
    });
  };
};
export default authReducer;
