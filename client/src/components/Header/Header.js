import React, {useState} from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import {todosThunks} from '../../redux/thunks/todos_thunks';
import AddForm from '../AddForm/AddForm';

import s from './Header.module.scss';

function Header({authorized, addTodo}) {
  const [modal, setModal] = useState(false);

  const onSubmit = async (formData) => {
    const deadline = new Date(formData.deadline).toISOString();
    await addTodo(formData.title, formData.description, deadline);
    setModal(false);
  };

  return (
    <div className={s.header}>
      <div>
        <Link to={'/'} className={s.headerToDo}>
          TODO APP
        </Link>
      </div>
      {(sessionStorage.getItem('authorized') || authorized) && (
        <div className={s.headerInfoWrapp}>
          <div>
            <button
              onClick={() => setModal(true)}
              className={s.headerAddButton}
            >
              Add Todo
            </button>
          </div>
          <Link to={'/user'} className={s.headerUser}>
            User
          </Link>
        </div>
      )}
      {modal && <AddForm onSubmit={onSubmit} onClose={() => setModal(false)} />}
    </div>
  );
}

const mapStateToProps = (state) => ({
  authorized: state.userPage.authorized,
});

const mapDispatchToProps = (dispatch) => ({
  addTodo: (title, description, deadline) =>
    dispatch(todosThunks.addTodo(title, description, deadline)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Header);
