import React from 'react';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';

import style from './navbar.module.css';
import { logoutUserThunkCreator } from '../../redux/auth-reducer';

function Navbar(props) {
  const { login, path } = props;

  return (
    <div className={style.navbar_body}>
      <nav>
        <input type='checkbox' id={style.check} />
        <label htmlFor={style.check} className={style.checkbtn}>
          <i className='fas fa-bars'></i>
        </label>
        <NavLink className={style.logo_a} to='/'>
          <label className={style.logo}>
            WhiteDark<span style={{ color: '#302d2dfb' }}>.Net</span>
          </label>
        </NavLink>
        <ul className={style.menu}>
          <li className={style.item}>
            <NavLink
              className={(path === '/' && style.active) || undefined}
              to='/'>
              <i className='fas fa-house-damage'></i>Home
            </NavLink>
          </li>
          {login ? (
            <>
              <li className={style.item}>
                <NavLink to='/chat'>
                  <i className='fas fa-comment-alt'></i>Chat
                </NavLink>
              </li>
              <li className={style.item + ' ' + style.me_area}>
                <NavLink className={style.me} to='/'>
                  <i
                    className={'fas fa-user-tie'}
                    style={{ color: 'white' }}></i>
                </NavLink>
                <div className={style.item + ' ' + style.me_box}>
                  <NavLink className={style.me_box_item} to='/settings/profile'>
                    <i className='fas fa-address-card'></i>Settings
                  </NavLink>
                  <NavLink
                    className={style.me_box_item}
                    onClick={props.logoutUserThunkCreator}
                    to='/login'>
                    <i className='fas fa-sign-in-alt'></i>LogOut
                  </NavLink>
                </div>
              </li>
            </>
          ) : (
            <>
              <li className={style.item}>
                <NavLink
                  className={(path === '/login' && style.active) || undefined}
                  to='/login'>
                  <i className='fas fa-sign-in-alt'></i>SignIn
                </NavLink>
              </li>
              <li className={style.item}>
                <NavLink
                  className={
                    (path === '/register' && style.active) || undefined
                  }
                  to='/register'>
                  <i className='fas fa-user-plus'></i>SignUp
                </NavLink>
              </li>
            </>
          )}
        </ul>
      </nav>
    </div>
  );
}

const mapStateToProps = state => ({
  login: state.authReducer.login,
  path: state.navbarReducer.path
});

export default connect(mapStateToProps, {
  logoutUserThunkCreator
})(Navbar);
