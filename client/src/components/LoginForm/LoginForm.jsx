import React from 'react';
import {connect} from 'react-redux';
import {Field, reduxForm} from 'redux-form';
import {renderField} from '../../util/util';
import s from './LoginForm.module.scss';

let validate = (values) => {
  const errors = {};
  if (!values.login) {
    errors.login = 'Required';
  }
  if (!values.password) {
    errors.password = 'Required';
  }
  return errors;
};

const LoginForm = (props) => {
  const {handleSubmit, submitting, onClose, otherError} = props;

  return (
    <form onSubmit={handleSubmit} className={s.formLogin}>
      <div className={s.otherError}>{otherError}</div>
      <div>
        <div>
          <Field
            name='login'
            type='text'
            label='Login'
            component={renderField}
            className={s.field}
          />
        </div>
      </div>
      <div>
        <div>
          <Field
            name='password'
            component={renderField}
            type='password'
            label='Password'
            className={s.field}
          />
        </div>
      </div>

      <div style={{display: 'flex'}}>
        <button
          type='submit'
          disabled={submitting}
          className={s.formButton}
          style={{backgroundColor: 'dodgerblue'}}
        >
          Login
        </button>
        <button
          type='button'
          disabled={submitting}
          onClick={onClose}
          className={s.formButton}
          style={{backgroundColor: 'darkslateblue'}}
        >
          Close
        </button>
      </div>
    </form>
  );
};

const mapStateToProps = (state) => ({
  otherError: state.userPage.error,
});
const Form = connect(mapStateToProps, null)(LoginForm);

export default reduxForm({
  form: 'login',
  validate,
})(Form);
