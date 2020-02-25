import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Redirect, NavLink } from 'react-router-dom';

import style from './register.module.css';
import {
  registerUserThunkCreator,
  clearAuthUserStatusThunkCreator
} from '../../../redux/auth-reducer';
import AuthError from '../authError/authError.jsx';
import { setCurentPathNameThunkCreator } from '../../../redux/navbar-reducer';
import { useForm, Error } from '../../formValidation';
import validateRegister from './validateRegister';

function Register(props) {
  const initialState = {
    password: '',
    email: '',
    confirmPassword: '',
    nickname: ''
  };
  useEffect(() => {
    return function clearStatus() {
      props.clearAuthUserStatusThunkCreator();
    };
  }, []);

  const Submit = () => {
    const data = {
      nickname: values.nickname,
      password: values.password,
      email: values.email
    };
    props.registerUserThunkCreator(data);
  };

  const showPassword = type => {
    const x = document.getElementById(type);
    if (x.type === 'password') x.type = 'text';
    else x.type = 'password';
  };

  const { onHandleChange, onHandleSubmit, values, errors } = useForm(
    Submit,
    validateRegister,
    initialState
  );

  const { login, path } = props;
  if (path !== '/register') props.setCurentPathNameThunkCreator('/register');
  if (login) return <Redirect to='/' />;

  return (
    <div className={style.register_body}>
      <div className={style.register_box}>
        <div className={style.register_avatar} />
        <h1>Register here</h1>
        <form onSubmit={onHandleSubmit}>
          <div className={style.register_input}>
            <label htmlFor='nickname'>Nickname</label>
            <input
              className={style.register_input_box}
              type='text'
              value={values.nickname}
              onChange={onHandleChange}
              id='nickname'
              name='nickname'
              placeholder='Enter nickname'
            />
            {errors.nickname && <Error message={errors.nickname} />}
          </div>
          <div className={style.register_input}>
            <label htmlFor='email'>Email</label>
            <input
              className={style.register_input_box}
              type='text'
              value={values.email}
              onChange={onHandleChange}
              id='email'
              name='email'
              placeholder='Enter email'
            />
            {errors.email && <Error message={errors.email} />}
          </div>
          <div className={style.register_input}>
            <label htmlFor='password'>Password</label>
            <input
              className={style.register_input_box}
              type='password'
              value={values.password}
              onChange={onHandleChange}
              id='password'
              name='password'
              placeholder='Enter password'
            />
            <input
              type='checkbox'
              onClick={() => {
                showPassword('password');
              }}
            />
            {errors.password && <Error message={errors.password} />}
          </div>
          <div
            className={style.register_input}
            style={
              values.password ? { display: 'block' } : { display: 'none' }
            }>
            <label htmlFor='confirmPassword'>Confirm password</label>
            <input
              className={style.register_input_box}
              type='password'
              value={values.confirmPassword}
              onChange={onHandleChange}
              id='confirmPassword'
              name='confirmPassword'
              placeholder='Enter password'
            />
            <input
              type='checkbox'
              onClick={() => {
                showPassword('confirmPassword');
              }}
              id='CP'
            />
            {errors.confirmPassword && (
              <Error message={errors.confirmPassword} />
            )}
          </div>
          <button type='submit'>Register</button>
        </form>
        <NavLink to='/login'>Have an account?</NavLink>
        {props.status && <AuthError status={props.status} />}
      </div>
    </div>
  );
}

const mapStateToProps = state => ({
  login: state.authReducer.login,
  status: state.authReducer.status,
  path: state.navbarReducer.path
});

export default connect(mapStateToProps, {
  setCurentPathNameThunkCreator,
  clearAuthUserStatusThunkCreator,
  registerUserThunkCreator
})(Register);
