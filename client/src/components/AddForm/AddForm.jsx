import React, {useEffect} from 'react';
import {connect} from 'react-redux';
import {Field, reduxForm} from 'redux-form';
import {parseDate, renderField} from '../../util/util';
import s from './AddForm.module.scss';

let validate = (values) => {
  const errors = {};
  if (!values.title) {
    errors.title = 'Required';
  }
  if (!values.password) {
    errors.password = 'Required';
  }
  return errors;
};

function AddForm(props) {
  const {handleSubmit, submitting, onClose} = props;

  return (
    <form onSubmit={handleSubmit} className={s.formAdd}>
      <div>
        <div>
          <Field
            name='title'
            type='text'
            label='Title'
            component={renderField}
            className={s.field}
          />
        </div>
      </div>
      <div>
        <div>
          <Field
            name='description'
            component={renderField}
            type='text'
            label='Description'
            className={s.field}
          />
        </div>
      </div>
      <div>
        <div>
          <Field
            name='deadline'
            component={renderField}
            type='date'
            className={s.field}
            date
          />
        </div>
      </div>
      <div>
        <div>
          <button
            className={s.addButton}
            onSubmit={handleSubmit}
            disabled={submitting}
          >
            Add
          </button>
          <button
            style={{backgroundColor: '#483d8b'}}
            className={s.addButton}
            onClick={onClose}
          >
            Close
          </button>
        </div>
      </div>
    </form>
  );
}

export default reduxForm({
  form: 'add',
  validate,
})(connect()(AddForm));
