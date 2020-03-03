import { userAPI } from '../api';

const SET_FORMS_STATUS = 'SET_FORMS_STATUS';
const SET_FORMS_DATA = 'SET_FORMS_DATA';
const SET_CHECKED_FORMS = 'SET_CHECKED_FORMS';

const initialState = {
  status: '',
  checked: false
};

const formsReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_FORMS_STATUS: {
      return { ...state, status: action.status };
    }
    case SET_CHECKED_FORMS: {
      return { ...state, checked: true };
    }
    case SET_FORMS_DATA: {
      return { ...state, forms: [...action.forms] };
    }
    default:
      return state;
  }
};

export const setCheckedForms = () => ({
  type: SET_CHECKED_FORMS
});

export const setFormsData = forms => ({
  type: SET_FORMS_DATA,
  forms
});

export const setFormsStatus = status => ({
  type: SET_FORMS_STATUS,
  status
});

export const saveFormSchemaThunk = data => {
  return dispatch => {
    userAPI.saveFormSchema(data).then(res => {
      dispatch(setFormsStatus(res.data.status));
    });
  };
};

export const saveFormDataThunk = data => {
  return dispatch => {
    userAPI.saveFormData(data).then(res => {
      alert(res.data.status);
      dispatch(setFormsStatus(res.data.status));
    });
  };
};

export const deleteFormSchemaThunk = id => {
  return dispatch => {
    userAPI.deleteFormSchema(id).then(res => {
      alert(res.data.status);
      dispatch(setFormsStatus(res.data.status));
    });
  };
};

export const getFormsDataThunk = () => {
  return dispatch => {
    userAPI.getFromsData().then(res => {
      dispatch(setFormsData(res.data.forms));
      dispatch(setCheckedForms());
    });
  };
};

export default formsReducer;
