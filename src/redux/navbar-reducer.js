const SET_CURENT_PATH_NAME = 'SET_CURENT_PATH_NAME';

const initialState = {
  path: '/'
};

const navbarReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_CURENT_PATH_NAME: {
      return { ...state, path: action.path };
    }
    default:
      return state;
  }
};

export const setCurentPathName = path => ({
  type: SET_CURENT_PATH_NAME,
  path
});

export const setCurentPathNameThunkCreator = path => {
  if (!navigator.onLine) window.location.pathname = '/network-problem';
  return dispatch => {
    dispatch(setCurentPathName(path));
  };
};

export default navbarReducer;
