import React from 'react';
import { connect } from 'react-redux';

import style from './securitySettings.module.css';
import { useForm } from '../../formValidation/index';
import emailValid from './changeEmailValid';
import { changeEmailThunkCreator } from '../../../redux/auth-reducer';

function ChangeEmail(props) {
  const initialState = {
    oldemail: '',
    newemail: ''
  };
  const Submit = () => {
    props.changeEmailThunkCreator({
      oldEmail: values.oldemail,
      newEmail: values.newemail
    });
  };
  const { onHandleChange, onHandleSubmit, values, errors } = useForm(
    Submit,
    emailValid,
    initialState
  );
  return (
    <div>
      <div className={style.securitySettings_from_box}>
        <div className={style.securitySettings_title}>
          <span>Change Email</span>
        </div>
        <form onSubmit={onHandleSubmit}>
          <div className={style.securitySettings_input_box}>
            <label className={style.securitySettings_label} htmlFor='oldemail'>
              Old email
            </label>
            <input
              className={style.securitySettings_input}
              type='email'
              name='oldemail'
              id='oldemail'
              value={values.oldemail}
              onChange={onHandleChange}
            />
            <p>{errors.oldemail}</p>
          </div>
          <div className={style.securitySettings_input_box}>
            <label className={style.securitySettings_label} htmlFor='newemail'>
              New email
            </label>
            <input
              className={style.securitySettings_input}
              type='email'
              name='newemail'
              id='newemail'
              value={values.newemail}
              onChange={onHandleChange}
            />
            <p>{errors.newemail}</p>
          </div>
          {props.status && <p>{props.status}</p>}
          <button type='submit'>Update email</button>
        </form>
      </div>
    </div>
  );
}

const mapSteteToProps = state => {
  return {
    status: state.authReducer.status
  };
};
export default connect(mapSteteToProps, { changeEmailThunkCreator })(
  ChangeEmail
);
