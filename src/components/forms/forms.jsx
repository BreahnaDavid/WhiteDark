import React, { useState } from 'react';
import { connect } from 'react-redux';

import {
  getFormsDataThunk,
  deleteFormSchemaThunk,
  saveFormDataThunk
} from './../../redux/forms-Reducer';
import style from './forms.module.css';

function Forms(props) {
  const [state, setState] = useState({});

  if (!props.checked) {
    props.getFormsDataThunk();
  } else if (!state.forms) setState({ forms: [...props.forms] });

  const onSubmit = (e, key) => {
    e.preventDefault();
    let data = {};
    const stateCopy = { ...state };
    stateCopy.forms[key].inputs.forEach((item, index) => {
      if (item.value)
        data[(item.label + key + index).toLowerCase()] = item.value;
      item.value = '';
    });
    props.saveFormDataThunk(data);
    setState({ ...stateCopy });
  };
  const onHandelChnage = (e, key, index) => {
    e.preventDefault();
    const { value } = e.target;
    const forms = state.forms;
    forms[key].inputs[index].value = value;
    setState({ forms });
  };
  const formsRender =
    state.forms &&
    state.forms.map((item, key) => {
      return (
        <div key={key} className={style.form_box}>
          <div className={style.form_header}>
            <button
              style={{ backgroundColor: 'red' }}
              onClick={() => {
                props.deleteFormSchemaThunk(item._id);
              }}>
              Delete
            </button>
            <span className={style.form_name}>{item.formName}</span>
            <span className={style.form_desc}>{item.formDesc}</span>
          </div>
          <form
            onSubmit={e => {
              onSubmit(e, key);
            }}
            className={style.form}>
            {item.inputs.map((item, index) => {
              return (
                <div key={index} className={style.form_input_box}>
                  <label htmlFor={item.label + key + index}>{item.label}</label>
                  {(item.type === 'text' ||
                    item.type === 'email' ||
                    item.type === 'date') && (
                    <input
                      onChange={e => {
                        onHandelChnage(e, key, index);
                      }}
                      value={state.forms[key].inputs[index].value}
                      className={style.form_input}
                      id={item.label + key + index}
                      type={item.type}
                      required={item.required}
                      placeholder={item.placeholder}
                    />
                  )}
                  {item.type === 'number' && (
                    <input
                      onChange={e => {
                        onHandelChnage(e, key, index);
                      }}
                      value={state.forms[key].inputs[index].value}
                      className={style.form_input}
                      id={item.label + key + index}
                      type={item.type}
                      required={item.required}
                      max={item.maxNumber}
                      min={item.minNumber}
                      placeholder={item.placeholder}
                    />
                  )}
                  {item.type === 'textarea' && (
                    <textarea
                      className={style.form_input + ' ' + style.textarea}
                      maxLength={item.maxLength}
                      required={item.required}
                      onChange={e => {
                        onHandelChnage(e, key, index);
                      }}
                      value={state.forms[key].inputs[index].value}
                    />
                  )}
                  {item.type === 'select' && (
                    <select
                      required={item.required}
                      className={style.form_input}
                      value={state.forms[key].inputs[index].value}
                      onChange={e => {
                        onHandelChnage(e, key, index);
                      }}>
                      <option value='' selected disabled hidden>
                        Select option
                      </option>
                      ;
                      {item.selectOption.split(',').map(item => {
                        return <option value={item}>{item}</option>;
                      })}
                    </select>
                  )}
                </div>
              );
            })}
            <button className={style.submit_button} type='submit'>
              Send
            </button>
          </form>
        </div>
      );
    });

  return (
    <div className={style.body}>
      <div className={style.forms_box}>{formsRender}</div>
    </div>
  );
}

const mapStateToProps = state => {
  return {
    forms: state.formsReducer.forms,
    checked: state.formsReducer.checked
  };
};

export default connect(mapStateToProps, {
  getFormsDataThunk,
  saveFormDataThunk,
  deleteFormSchemaThunk
})(Forms);
