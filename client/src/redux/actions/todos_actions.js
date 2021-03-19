import {actionsTypeTodos} from './todos_action_type';

export const todosActions = {
  setAllTodos: (todos) => ({
    type: actionsTypeTodos.SET_ALL_TODOS,
    payload: todos,
  }),
  setCurrentTodo: (todo) => ({
    type: actionsTypeTodos.SET_CURRENT_TODO,
    payload: todo,
  }),
};
