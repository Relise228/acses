import {stat} from 'fs';
import React, {useEffect, useState} from 'react';
import {connect} from 'react-redux';
import {todosThunks} from '../../redux/thunks/todos_thunks';
import Wrapper from '../Wrapper/Wrapper';
import s from './MainPage.module.scss';
import classNames from 'classnames';
import TodoBox from '../TodoBox/TodoBox';
import {todosActions} from '../../redux/actions/todos_actions';
import {filterTodos} from '../../util/util';

function MainPage({
  allTodos,
  getAllTodo,
  closeTodo,
  deleteTodo,
  history,
  setCurrentTodo,
}) {
  const [but, setBut] = useState('active');
  const [sortType, setSortType] = useState('created');

  const todos = [...allTodos];

  const onActive = () => {
    setBut('active');
  };

  const onClosed = () => {
    setBut('closed');
  };

  const onClickTodo = async (todo) => {
    await setCurrentTodo(todo);
    history.push('/todo');
  };

  const onDelete = (date) => {
    deleteTodo(date);
  };

  const onTodoClose = (date) => {
    closeTodo(date);
  };

  useEffect(() => {
    getAllTodo();
  }, []);

  const onChangeSort = (event) => {
    setSortType(event.target.value);
  };

  return (
    <div className={s.mainPage}>
      <Wrapper>
        <div className={s.mainPageWrapper}>
          <div className={s.mainPageButtons}>
            <button
              onClick={onActive}
              className={`${s.mainPageButton} ${
                but === 'active' && s.mainPageButtonActive
              }`}
            >
              Active
            </button>
            <button
              onClick={onClosed}
              className={`${s.mainPageButton} ${
                but === 'closed' && s.mainPageButtonClosed
              }`}
            >
              Closed
            </button>
            <select name='select' onChange={onChangeSort} value={sortType}>
              <option value='title'>By title</option>
              <option value='created'>By created</option>
            </select>
          </div>
          <div
            style={{
              width: '100%',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <div></div>
            {but === 'active' &&
              filterTodos(todos, sortType).map((t) => {
                return t.inProgress ? (
                  <TodoBox
                    onClickTodo={onClickTodo}
                    onClose={onTodoClose}
                    onDelete={onDelete}
                    todo={t}
                    active
                  />
                ) : (
                  ''
                );
              })}
            {but === 'closed' &&
              filterTodos(todos, sortType).map((t) => {
                return !t.inProgress ? (
                  <TodoBox
                    onClickTodo={onClickTodo}
                    onClose={onTodoClose}
                    onDelete={onDelete}
                    todo={t}
                  />
                ) : (
                  ''
                );
              })}
          </div>
        </div>
      </Wrapper>
    </div>
  );
}

const mapStateToProps = (state) => ({
  allTodos: state.todoPage.allTodos,
});

const mapDispatchToProps = (dispatch) => ({
  getAllTodo: () => dispatch(todosThunks.getAllTodos()),
  deleteTodo: (date) => dispatch(todosThunks.deleteTodo(date)),
  closeTodo: (date) => dispatch(todosThunks.closeTodo(date)),
  setCurrentTodo: (todo) => dispatch(todosActions.setCurrentTodo(todo)),
});

export default connect(mapStateToProps, mapDispatchToProps)(MainPage);
