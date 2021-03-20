import React, {useState} from 'react';
import {connect} from 'react-redux';
import {parseDate} from '../../util/util';
import Wrapper from '../Wrapper/Wrapper';
import s from './TodoPage.module.scss';
import {Link} from 'react-router-dom';
import {todosThunks} from '../../redux/thunks/todos_thunks';
import EditForm from '../EditForm/EditForm';

function TodoPage({currentTodo, closeTodo, deleteTodo, history, updateTodo}) {
  const [showModal, setShowModal] = useState(false);

  const onEditSave = () => {
    setShowModal(true);
  };

  const onCloseTodo = async () => {
    await closeTodo(currentTodo.createdDate);
    history.push('/');
  };
  const onDeleteTodo = async () => {
    await deleteTodo(currentTodo.createdDate);
    history.push('/');
  };

  const onSubmit = async (formData) => {
    const deadline = new Date(formData.deadline).toISOString();
    await updateTodo(
      formData.title,
      formData.description,
      currentTodo.createdDate,
      deadline,
      currentTodo.inProgress
    );
    setShowModal(false);
  };

  return (
    <div className={s.todo}>
      <Wrapper>
        <div className={s.todoWrapper}>
          {!showModal ? (
            <div>
              <div className={s.todoTitle}>
                <Link to={'/'} className={s.todoToMain}>
                  &#129044;
                </Link>
                {currentTodo.title}
              </div>
              <div className={s.todoDescription}>{currentTodo.description}</div>
              <div className={s.todoDate}>
                <div>
                  Created Date
                  <br />
                  {parseDate(currentTodo.createdDate)}
                </div>
                <div>
                  Deadline
                  <br />
                  {parseDate(currentTodo.deadline)}
                </div>
              </div>
            </div>
          ) : (
            <EditForm
              title={currentTodo.title}
              description={currentTodo.description}
              deadline={currentTodo.deadline}
              onSubmit={onSubmit}
            />
          )}
          {currentTodo.inProgress && (
            <div className={s.todoButtonWrapper}>
              {!showModal && (
                <button className={s.todoButton} onClick={onEditSave}>
                  Edit
                </button>
              )}
              <button
                className={s.todoButton}
                style={{backgroundColor: '#1e90ff'}}
                onClick={onCloseTodo}
              >
                Close
              </button>
              <button
                className={s.todoButton}
                style={{backgroundColor: '#483d8b'}}
                onClick={onDeleteTodo}
              >
                Delete
              </button>
            </div>
          )}
        </div>
      </Wrapper>
    </div>
  );
}

const mapStateToProps = (state) => ({
  currentTodo: state.todoPage.currentTodo,
});

const mapDispatchToProps = (dispatch) => ({
  deleteTodo: (date) => dispatch(todosThunks.deleteTodo(date)),
  closeTodo: (date) => dispatch(todosThunks.closeTodo(date)),
  updateTodo: (title, description, createdDate, deadline, inProgress) =>
    dispatch(
      todosThunks.updateTodo(
        title,
        description,
        createdDate,
        deadline,
        inProgress
      )
    ),
});
export default connect(mapStateToProps, mapDispatchToProps)(TodoPage);
