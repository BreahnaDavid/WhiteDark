import React, { useState } from 'react';
import { connect } from 'react-redux';

import { saveFormSchemaThunk } from '../../redux/forms-Reducer';
import style from './formBuilder.module.css';

function FormBuilder(props) {
  const [state, setState] = useState({
    inputs: [],
    formName: '',
    formDesc: ''
  });
  const [active, setActive] = useState('formName');
  const [errors, setErrors] = useState({});

  const onHandleChnage = (e, key) => {
    const name = e.target.name;
    const value =
      e.target.type === 'checkbox' ? e.target.checked : e.target.value;

    if (name !== 'formName' && name !== 'formDesc') {
      const inputs = state.inputs;
      inputs.map((item, index) => {
        if (index === key) {
          if (name === 'type' && item.type) {
            Object.getOwnPropertyNames(item).forEach(function(val) {
              if (val !== 'type') delete item[val];
            });
          }
          item[name] = value;
        }
        return item;
      });

      setState({ ...state, inputs });
    } else {
      setState({ ...state, [name]: value });
    }

    control();
  };

  const control = () => {
    let errors = { inputs: [] };
    let control = true;

    state.inputs.forEach((item, key) => {
      if (!item.label) {
        control = false;
      } else errors.inputs[key] = {};
    });

    if (!state.formName) {
      control = false;
      errors.formName = 'Form name is required';
    }
    if (!state.formDesc) {
      control = false;
      errors.formDesc = 'Form description is required';
    }
    if (state.inputs.length === 0) {
      errors.inputList = 'Inputs is required';
      control = false;
    }
    if (control) return true;
    else setErrors({ ...errors });
    return false;
  };

  const onSubmit = () => {
    if (control()) {
      props.saveFormSchemaThunk(state);
      setState({ inputs: [], formName: '', formDesc: '' });
    }
  };

  const inputsOptions = key => {
    if (state.inputs[key].type === 'text' || state.inputs[key].type === 'email')
      return (
        <div className={style.input_option_box}>
          <label htmlFor='placeholder'>Placeholder</label>
          <input
            onChange={e => onHandleChnage(e, key)}
            type='text'
            id='placeholder'
            name='placeholder'
            value={
              state.inputs[key].placeholder ? state.inputs[key].placeholder : ''
            }
          />
        </div>
      );
    else if (state.inputs[key].type === 'number')
      return (
        <>
          <div className={style.input_option_box}>
            <label htmlFor='maxNumber'>Max number</label>
            <input
              onChange={e => onHandleChnage(e, key)}
              type='number'
              id='maxNumber'
              name='maxNumber'
              value={state.inputs[key].maxNumber}
            />
          </div>
          <div>
            <label htmlFor='minNumber'>Min number</label>
            <input
              onChange={e => onHandleChnage(e, key)}
              type='number'
              id='minNumber'
              name='minNumber'
              value={state.inputs[key].minNumber}
            />
          </div>
        </>
      );
    else if (state.inputs[key].type === 'select')
      return (
        <div className={style.input_option_box}>
          <label htmlFor='selectOption'>Select Option</label>
          <input
            onChange={e => onHandleChnage(e, key)}
            type='text'
            placeholder='place option ,'
            id='selectOption'
            name='selectOption'
            value={state.inputs[key].selectOption}
          />
        </div>
      );
    else if (state.inputs[key].type === 'textarea')
      return (
        <div className={style.input_option_box}>
          <label htmlFor='maxLength'>Max length</label>
          <input
            onChange={e => onHandleChnage(e, key)}
            type='number'
            id='maxLength'
            name='maxLength'
            value={state.inputs[key].maxLength}
          />
        </div>
      );
  };

  const menuRender = () => {
    return (
      <>
        <div
          onClick={() =>
            setState({ ...state, inputs: [...state.inputs, { type: '' }] })
          }
          className={style.menu}>
          +
        </div>
        <button onClick={onSubmit} className={style.save}>
          Save
        </button>
      </>
    );
  };

  const deleteInput = key => {
    const inputs = state.inputs.filter((item, index) => {
      return index !== key;
    });

    setState({ ...state, inputs });
  };

  const formRender = state.inputs.map((item, key) => {
    return (
      <div
        onClick={() => setActive(key)}
        key={key}
        className={style.form_body + ' ' + (active === key && style.active)}>
        <label className={style.form_body_select_label} htmlFor='select'>
          Select type
        </label>
        <select
          className={style.form_body_select}
          id='select'
          name='type'
          value={state.inputs[key].type}
          onChange={e => onHandleChnage(e, key)}>
          <option value='' selected disabled hidden>
            Choose here the type
          </option>
          <option value='text'>Text</option>
          <option value='number'>Number</option>
          <option value='email'>Email</option>
          <option value='date'>Date</option>
          <option value='select'>Select</option>
          <option value='textarea'>Textarea</option>
        </select>
        <span></span>
        <div className={style.form_body_options}>
          {state.inputs[key].type && (
            <>
              {inputsOptions(key)}
              <div>
                <label htmlFor='label'>Label</label>
                <input
                  onChange={e => onHandleChnage(e, key)}
                  type='text'
                  id='label'
                  name='label'
                  value={state.inputs[key].label ? state.inputs[key].label : ''}
                  placeholder='Label is required'
                />
              </div>
            </>
          )}
        </div>

        <div className={style.form_body_footer}>
          <div style={{ float: 'right', display: 'flex' }}>
            <i
              onClick={() => {
                return deleteInput(key);
              }}
              style={{ marginRight: '10px' }}
              className='fas fa-trash-alt'
            />
            <label htmlFor='required'>Required</label>
            <input
              checked={state.inputs[key].required}
              onChange={e => onHandleChnage(e, key)}
              type='checkbox'
              name='required'
              id='required'
            />
          </div>
        </div>
        {active === key && menuRender()}
      </div>
    );
  });
  return (
    <div className={style.body}>
      <div className={style.form_builder_box}>
        <div
          onClick={() => setActive('formName')}
          className={style.form_header}>
          <input
            className={style.form_header_input}
            type='text'
            name='formName'
            onChange={onHandleChnage}
            id='formName'
            value={state.formName && state.formName}
            placeholder='Form name'
          />
          <span style={{ color: 'red' }}>
            {errors.formName && errors.formName}
          </span>
          <input
            className={style.form_header_input}
            type='text'
            value={state.formDesc && state.formDesc}
            onChange={onHandleChnage}
            name='formDesc'
            id='formDesc'
            placeholder='Form description'
          />
          <span style={{ color: 'red' }}>
            {errors.formDesc && errors.formDesc}
            <br />
            {errors.inputList && errors.inputList}
          </span>
          {(active === 'formName' || state.inputs.length === 0) && menuRender()}
        </div>
        {formRender}
      </div>
    </div>
  );
}

export default connect(null, { saveFormSchemaThunk })(FormBuilder);