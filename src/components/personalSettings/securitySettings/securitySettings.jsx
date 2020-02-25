import React from 'react';

import ChangePassword from './changePassword';
import ChangeEmail from './changeEmail';
import style from './securitySettings.module.css';

export default function SecuritySettings() {
  return (
    <div className={style.securitySettings_area}>
      <ChangePassword />
      <ChangeEmail />
    </div>
  );
}
