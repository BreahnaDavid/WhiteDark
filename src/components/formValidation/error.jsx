import React from 'react';
import style from './error.module.css';

export default function error({ message }) {
  return (
    <div className={style.error_body}>
      <span>{message}</span>
    </div>
  );
}
