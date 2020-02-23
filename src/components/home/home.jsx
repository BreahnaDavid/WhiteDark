import React from 'react';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';

import style from './home.module.css';
import { setCurentPathNameThunkCreator } from '../../redux/navbar-reducer';

function Home(props) {
  const { path } = props;

  if (path !== '/') props.setCurentPathNameThunkCreator('/');
  return (
    <div className={style.body}>
      <div className={style.body_overlay}>
        <div className={style.content}>
          <div className={style.icons}>
            <i className='fab fa-apple'></i>
            <i className='fab fa-android'></i>
            <i className='fab fa-windows'></i>
          </div>
          <div className={style.text}>
            I LOVE <span style={{ color: 'red' }}>CODINGS</span>
          </div>
          <div className={style.button_box}>
            <NavLink to='/' className={style.btn1}>
              STUDY TODAY !
            </NavLink>
            <NavLink to='/' className={style.btn2}>
              SHARE TODAY !
            </NavLink>
          </div>
        </div>
      </div>
    </div>
  );
}
const mapStateToProps = state => {
  return {
    path: state.navbarReducer.path
  };
};

export default connect(mapStateToProps, { setCurentPathNameThunkCreator })(
  Home
);
