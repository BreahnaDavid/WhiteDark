import React from 'react';
import { connect } from 'react-redux';

import style from './accountSettings.module.css';
import { deleteAccount } from '../../../redux/auth-reducer';

function AccountSettings(props) {
  const deleteAccount = () => {
    // props.deleteAccount();
  };
  const changeNickName = () => {
    // props.changeNickName();
  };
  return (
    <div className={style.accountSettings_area}>
      <div className={style.accountSettings_box}>
        <div className={style.accountSettings_title}>
          <span>Change nickname</span>
        </div>
        <button
          className={style.accountSettings_button}
          onClick={changeNickName}
          type='button'>
          Change nickname
        </button>
        <p>Changing your username can have unintended side effects.</p>
      </div>
      <div
        className={
          style.accountSettings_box + ' ' + style.accountSettings_delete
        }>
        <div className={style.accountSettings_title}>
          <span>Delete account</span>
        </div>
        <button
          className={style.accountSettings_button}
          onClick={deleteAccount}
          type='button'>
          Delete account
        </button>
        <p>
          Once you delete your account, there is no going back. Please be
          certain.
        </p>
      </div>
    </div>
  );
}

export default connect(null, { deleteAccount })(AccountSettings);
