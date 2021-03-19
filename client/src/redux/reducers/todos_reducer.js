import actions from 'redux-form/lib/actions';
import {actionsTypeTodos} from '../actions/todos_action_type';

let initialState = {
  allTodos: [],
  currentTodo: {},
};

const todoReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionsTypeTodos.SET_ALL_TODOS:
      return {
        ...state,
        allTodos: [...action.payload],
      };
    case actionsTypeTodos.SET_CURRENT_TODO:
      return {
        ...state,
        currentTodo: {...action.payload},
      };
    default:
      return state;
  }
};

export default todoReducer;
