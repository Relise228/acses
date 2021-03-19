import React from 'react';
import s from './TodoBox.module.scss';

function TodoBox({todo, active, onClickTodo, onClose, onDelete}) {
  const createdDate = new Date(todo.createdDate).toLocaleDateString();
  const deadlineDate = new Date(todo.deadline).toLocaleDateString();

  console.log(todo.title);

  return (
    <div className={s.todoBox}>
      <div className={s.todoBoxTitle} onClick={() => onClickTodo(todo)}>
        {todo.title}
      </div>
      <div className={s.todoBoxCreated}>Created: {createdDate}</div>
      <div className={s.todoBoxDeadline}>Deadline: {deadlineDate}</div>
      {active && (
        <div className={s.todoBoxButtonsWrapper}>
          <button
            className={s.todoBoxButton}
            onClick={() => onClose(todo.createdDate)}
          >
            Close
          </button>
          <button
            className={s.todoBoxButton}
            style={{backgroundColor: 'darkslateblue'}}
            onClick={() => onDelete(todo.createdDate)}
          >
            Delete
          </button>
        </div>
      )}
    </div>
  );
}

export default TodoBox;
