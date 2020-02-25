import React, { useEffect } from 'react';
import { Redirect, NavLink } from 'react-router-dom';
import { connect } from 'react-redux';

import style from './login.module.css';
import {
  loginUserThunkCreator,
  clearAuthUserStatusThunkCreator
} from '../../../redux/auth-reducer';
import AuthError from '../authError/authError.jsx';
import { setCurentPathNameThunkCreator } from '../../../redux/navbar-reducer';
import { useForm, Error } from '../../formValidation';
import validateLogin from './validateLogin';

function Login(props) {
  const initialState = {
    password: '',
    email: ''
  };

  const Submit = () => {
    props.loginUserThunkCreator(values.email, values.password);
  };

  const { onHandleChange, onHandleSubmit, values, errors } = useForm(
    Submit,
    validateLogin,
    initialState
  );

  useEffect(() => {
    return function clearStatus() {
      props.clearAuthUserStatusThunkCreator();
    };
  }, []);

  const { login, path } = props;

  if (path !== '/login') props.setCurentPathNameThunkCreator('/login');
  if (login === true) return <Redirect to='/' />;

  return (
    <div className={style.login_body}>
      <div className={style.login_box}>
        <div className={style.login_avatar} />
        <h1>Login here</h1>
        <form onSubmit={onHandleSubmit}>
          <div className={style.input_box}>
            <input
              className={style.input}
              type='text'
              value={values.email}
              onChange={onHandleChange}
              id='email'
              name='email'
              required='a'
            />
            <label htmlFor='email'>Email</label>
            {errors.email && <Error message={errors.email} />}
          </div>
          <div className={style.input_box}>
            <input
              className={style.input}
              type='password'
              value={values.password}
              onChange={onHandleChange}
              id='password'
              name='password'
              required='#'
            />
            <label htmlFor='password'>Password</label>
            {errors.password && <Error message={errors.password} />}
          </div>
          <button className={style.login_button} type='submit'>
            Login
          </button>
        </form>
        <NavLink to='/register'>Don't have an account?</NavLink>
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
  loginUserThunkCreator
})(Login);
