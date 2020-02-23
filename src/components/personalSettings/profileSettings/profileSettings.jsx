import React from 'react';

import style from './profileSettings.module.css';
import { useForm } from '../../formValidation/index';
import { connect } from 'react-redux';
import { setUserDataThunkCreator } from '../../../redux/auth-reducer';

function ProfileSettings(props) {
  const initialState = {
    firstname: '',
    lastname: '',
    dateOfBirth: '',
    country: '',
    gender: ''
  };
  function Submit() {
    let data = {};
    if (values.firstname) data.firstname = values.firstname;
    if (values.lastname) data.lastname = values.lastname;
    if (values.dateOfBirth) data.dateOfBirth = values.dateOfBirth;
    if (values.country) data.country = values.country;
    if (values.gender) data.gender = values.gender;
    props.setUserDataThunkCreator(data);
  }
  const { onHandleChange, onHandleSubmit, values } = useForm(
    Submit,
    values => {
      return {};
    },
    initialState
  );
  return (
    <div>
      <div className={style.profileSettings_title}>
        <span>Public profile</span>
      </div>
      <form className={style.profileSettings_form} onSubmit={onHandleSubmit}>
        <div className={style.profileSettings_input_box}>
          <label className={style.profileSettings_label} htmlFor='firstname'>
            First Name
          </label>
          <input
            className={style.profileSettings_input}
            type='text'
            name='firstname'
            id='firstname'
            value={values.firstname}
            onChange={onHandleChange}
            placeholder={props.firstname}
          />
        </div>
        <div className={style.profileSettings_input_box}>
          <label className={style.profileSettings_label} htmlFor='lastname'>
            Last Name
          </label>
          <input
            className={style.profileSettings_input}
            type='text'
            name='lastname'
            id='lastname'
            value={values.lastname}
            onChange={onHandleChange}
            placeholder={props.lastname}
          />
        </div>
        <div className={style.profileSettings_input_box}>
          <label className={style.profileSettings_label} htmlFor='dateOfBirth'>
            Date of birth
          </label>
          <input
            className={style.profileSettings_input}
            type='date'
            name='dateOfBirth'
            id='dateOfBirth'
            value={values.dateOfBirth ? values.dateOfBirth : props.dateOfBirth}
            onChange={onHandleChange}
          />
        </div>
        <div className={style.profileSettings_input_radio}>
          <p className={style.profileSettings_label}>
            Please select your gender
          </p>
          <div>
            <input
              type='radio'
              name='gender'
              id='male'
              value='male'
              onChange={onHandleChange}
            />
            <label htmlFor='male'>Male</label>
          </div>
          <div>
            <input
              type='radio'
              name='gender'
              id='female'
              value='female'
              onChange={onHandleChange}
            />
            <label htmlFor='female'>Female</label>
          </div>
          <div>
            <input
              type='radio'
              name='gender'
              id='other'
              value='other'
              onChange={onHandleChange}
            />
            <label htmlFor='other'>Other</label>
          </div>
        </div>
        <div className={style.profileSettings_input_box}>
          <label className={style.profileSettings_label} htmlFor='country'>
            Country
          </label>
          <select
            id='country'
            className={style.profileSettings_select}></select>
        </div>
        <button className={style.profileSettings_button} type='submit'>
          Update profile
        </button>
      </form>
    </div>
  );
}

const mapStateToProps = state => {
  return {
    firstname: state.authReducer.firstname,
    lastname: state.authReducer.lastname,
    dateOfBirth: state.authReducer.dateOfBirth,
    country: state.authReducer.country
  };
};
export default connect(mapStateToProps, { setUserDataThunkCreator })(
  ProfileSettings
);
