import React from 'react';

import style from './authError.module.css';

export default function AuthError(props) {
  return (
    <div className={style.error_box}>
      <p
        style={{
          color: 'rgb(39, 36, 36)',
          textAlign: 'center'
        }}>
        {props.status}
      </p>
    </div>
  );
}
