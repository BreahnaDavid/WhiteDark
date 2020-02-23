import React from 'react';
import { connect } from 'react-redux';

import style from './securitySettings.module.css';
import { useForm } from '../../formValidation/index';
import changePasswordValid from './changePasswordValid';
import { changePasswordThunkCreator } from '../../../redux/auth-reducer';

function ChangePassword(props) {
  const initialState = {
    oldpassword: '',
    confirmPassword: '',
    newpassword: ''
  };

  const Submit = () => {
    props.changePasswordThunkCreator({
      oldPassword: values.oldpassword,
      newPassword: values.newpassword
    });
  };

  const { onHandleChange, onHandleSubmit, values, errors } = useForm(
    Submit,
    changePasswordValid,
    initialState
  );
  return (
    <div>
      <div className={style.securitySettings_from_box}>
        <div className={style.securitySettings_title}>
          <span>Change Password</span>
        </div>
        <form onSubmit={onHandleSubmit}>
          <div className={style.securitySettings_input_box}>
            <label
              className={style.securitySettings_label}
              htmlFor='oldpassword'>
              Old password
            </label>
            <input
              className={style.securitySettings_input}
              type='password'
              name='oldpassword'
              id='oldpassword'
              value={values.oldpassword}
              onChange={onHandleChange}
            />
            <p>{errors.oldpassword}</p>
          </div>
          <div className={style.securitySettings_input_box}>
            <label
              className={style.securitySettings_label}
              htmlFor='newpassword'>
              New password
            </label>
            <input
              className={style.securitySettings_input}
              type='password'
              name='newpassword'
              id='newpassword'
              value={values.newpassword}
              onChange={onHandleChange}
            />
            <p>{errors.newpassword}</p>
          </div>
          <div className={style.securitySettings_input_box}>
            <label
              className={style.securitySettings_label}
              htmlFor='confirmPassword'>
              Confrim new password
            </label>
            <input
              className={style.securitySettings_input}
              type='password'
              name='confirmPassword'
              id='confirmPassword'
              value={values.confirmPassword}
              onChange={onHandleChange}
            />
            <p>{errors.confirmPassword}</p>
          </div>
          {props.status && <p>{props.status}</p>}
          <button type='submit'>Update password</button>
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
export default connect(mapSteteToProps, { changePasswordThunkCreator })(
  ChangePassword
);
