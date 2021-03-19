import {todosAPI} from '../../api/api';
import {todosActions} from '../actions/todos_actions';

export const todosThunks = {
  getAllTodos: () => async (dispatch) => {
    let data = await todosAPI.getAllTodos();
    console.log(data);
    dispatch(todosActions.setAllTodos(data));
  },
  closeTodo: (date) => async (dispatch) => {
    let data = await todosAPI.closeTodo(date);
    console.log(data);
    dispatch(todosActions.setAllTodos(data));
  },
  deleteTodo: (date) => async (dispatch) => {
    let data = await todosAPI.deleteTodo(date);
    console.log(data);
    dispatch(todosActions.setAllTodos(data));
  },
};
