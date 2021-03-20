import {stat} from 'fs';
import React, {useEffect} from 'react';
import {connect} from 'react-redux';
import {Field, reduxForm} from 'redux-form';
import {renderField} from '../../util/util';
import s from './EditUserForm.module.scss';

let validate = (values) => {
  const errors = {};
  if (!values.login) {
    errors.login = 'Required';
  }
  if (!values.password) {
    errors.password = 'Required';
  }
  if (!values.firstName) {
    errors.firstName = 'Required';
  }
  if (!values.lastName) {
    errors.lastName = 'Required';
  }
  if (!values.icon) {
    errors.icon = 'Required';
  }
  return errors;
};

function EditUserForm(props) {
  const {handleSubmit, submitting, onClose} = props;
  const {login, password, firstName, lastName, icon} = props;

  useEffect(() => {
    props.initialize({
      login,
      password,
      firstName,
      lastName,
      icon,
    });
  }, []);

  return (
    <form onSubmit={handleSubmit} className={s.forEditUser}>
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
      <div>
        <div>
          <Field
            name='firstName'
            component={renderField}
            type='text'
            label='First Name'
            className={s.field}
          />
        </div>
      </div>
      <div>
        <div>
          <Field
            name='lastName'
            component={renderField}
            type='text'
            label='Last Name'
            className={s.field}
          />
        </div>
      </div>
      <div>
        <div>
          <Field
            name='icon'
            component={renderField}
            type='text'
            label='Icon URL'
            className={s.field}
          />
        </div>
      </div>
      <div>
        <div style={{marginTop: 20}}>
          <button
            className={s.editUserButton}
            onSubmit={handleSubmit}
            disabled={submitting}
          >
            Save
          </button>
          <button
            style={{backgroundColor: '#483d8b'}}
            className={s.editUserButton}
            onClick={onClose}
          >
            Cancel
          </button>
        </div>
      </div>
    </form>
  );
}

const mapStateToProps = (state) => ({
  login: state.userPage.user.login,
  password: state.userPage.user.password,
  firstName: state.userPage.user.firstName,
  lastName: state.userPage.user.lastName,
  icon: state.userPage.user.icon,
});

export default reduxForm({
  form: 'editUser',
  validate,
})(connect(mapStateToProps, null)(EditUserForm));
