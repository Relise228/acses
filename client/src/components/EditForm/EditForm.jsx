import React, {useEffect} from 'react';
import {connect} from 'react-redux';
import {Field, reduxForm} from 'redux-form';
import {parseDate, renderField} from '../../util/util';
import s from './EditForm.module.scss';

let validate = (values) => {
  const errors = {};
  if (!values.title) {
    errors.title = 'Required';
  }
  if (!values.deadline) {
    errors.deadline = 'Required';
  }
  return errors;
};

function EditForm(props) {
  const {
    handleSubmit,
    submitting,
    onClose,
    title,
    description,
    deadline,
  } = props;

  const dateFormat = (date) => {
    date = parseDate(deadline).split('/').reverse();
    let temp = date[1];
    date[1] = date[2];
    date[2] = temp;
    if (date[1] < 10) {
      date[1] = '0' + date[1];
    }
    return date.join('-');
  };

  useEffect(() => {
    props.initialize({
      title: title,
      description: description,
      deadline: dateFormat(deadline),
    });
  }, []);
  return (
    <form onSubmit={handleSubmit} className={s.formEdit}>
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
            label='Description'
            className={s.field}
            date
          />
        </div>
      </div>
      <div>
        <div>
          <button
            className={s.saveButton}
            disabled={submitting}
            onSubmit={handleSubmit}
          >
            Save
          </button>
        </div>
      </div>
    </form>
  );
}

const mapStateToProps = (state) => ({
  title: state.todoPage.currentTodo.title,
  descriprion: state.todoPage.currentTodo.description,
  deadline: state.todoPage.currentTodo.deadline,
});

export default reduxForm({
  form: 'edit',
  validate,
})(connect()(EditForm));
