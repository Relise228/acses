import s from '../components/LoginForm/LoginForm.module.scss';

export const filterTodos = (todos, type) => {
  if (type === 'created') {
    todos.sort((a, b) => {
      if (a.createdDate > b.createdDate) {
        return -1;
      } else {
        return 1;
      }
    });
  } else if (type === 'title') {
    todos.sort((a, b) => a.title.localeCompare(b.title));
  }

  return todos;
};

export const parseDate = (date) => {
  return new Date(date).toLocaleDateString();
};

export const renderField = ({
  otherError,
  input,
  label,
  type,
  meta: {touched, error},
}) => {
  const border =
    otherError || (touched && error) ? {borderBottom: '1px solid red'} : {};
  return (
    <div>
      <input
        {...input}
        placeholder={label}
        type={type}
        className={s.field}
        style={border}
      />
    </div>
  );
};
