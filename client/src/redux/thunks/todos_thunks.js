import {todosAPI} from '../../api/api';
import {todosActions} from '../actions/todos_actions';

export const todosThunks = {
  getAllTodos: () => async (dispatch) => {
    let data = await todosAPI.getAllTodos();
    dispatch(todosActions.setAllTodos(data));
  },
  closeTodo: (date) => async (dispatch) => {
    let data = await todosAPI.closeTodo(date);
    dispatch(todosActions.setAllTodos(data));
  },
  deleteTodo: (date) => async (dispatch) => {
    let data = await todosAPI.deleteTodo(date);
    dispatch(todosActions.setAllTodos(data));
  },
  updateTodo: (title, description, createdDate, deadline, inProgress) => async (
    dispatch
  ) => {
    let data = await todosAPI.updateTodo(
      title,
      description,
      createdDate,
      deadline,
      inProgress
    );
    dispatch(todosActions.setAllTodos(data));
    data.map((t) => {
      t.createdDate === createdDate && dispatch(todosActions.setCurrentTodo(t));
    });
  },
  addTodo: (title, descriprion, deadline) => async (dispatch) => {
    let data = await todosAPI.addTodo(title, descriprion, deadline);
    dispatch(todosActions.setAllTodos(data));
  },
};
