import React from 'react';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';

import style from './personalSettings.module.css';
import { setCurentPathNameThunkCreator } from '../../redux/navbar-reducer';
import ProfileSettings from './profileSettings/profileSettings';
import AccountSetting from './accountSettings/accountSettings';
import SecuritySettings from './securitySettings/securitySettings';

function PersonalSettings(props) {
  const subSettings = props.match.params.subsettings;
  props.setCurentPathNameThunkCreator('');
  return (
    <div className={style.body}>
      <div className={style.avatar_box}>
        <img
          className={style.profile_avatar}
          src={require('../../images/login_avatar.jpg')}
          alt='avatar'
        />
        <h3 className={style.nickname}>{props.nickname}</h3>
      </div>
      <div className={style.settings_grid_container}>
        <div>
          <div className={style.settings_menu}>
            <div className={style.settings_menu_title}>
              <span>Personal settings</span>
            </div>
            <NavLink
              className={
                style.settings_button +
                ' ' +
                (subSettings === 'profile' && style.selected)
              }
              to='/settings/profile'>
              <span>Profile</span>
            </NavLink>
            <NavLink
              className={
                style.settings_button +
                ' ' +
                (subSettings === 'account' && style.selected)
              }
              to='/settings/account'>
              <span>Account</span>
            </NavLink>
            <NavLink
              className={
                style.settings_button +
                ' ' +
                (subSettings === 'security' && style.selected)
              }
              to='/settings/security'>
              <span>Security</span>
            </NavLink>
          </div>
        </div>
        <div className={style.grid_item}>
          {subSettings === 'profile' && <ProfileSettings />}
          {subSettings === 'account' && <AccountSetting />}
          {subSettings === 'security' && <SecuritySettings />}
        </div>
      </div>
    </div>
  );
}

const mapStateToProps = state => {
  return {
    nickname: state.authReducer.nickname,
    path: state.navbarReducer.path
  };
};

export default connect(mapStateToProps, { setCurentPathNameThunkCreator })(
  PersonalSettings
);
