import axios from 'axios';

const instance = axios.create({
  baseURL: 'http://localhost:5000/',
});

export const todosAPI = {
  getAllTodos: () => instance.get('todos/').then((response) => response.data),
  closeTodo: (createdDate) =>
    instance
      .post('todos/close', {createdDate})
      .then((response) => response.data),
  deleteTodo: (createdDate) =>
    instance
      .delete('todos/delete', {data: {createdDate}})
      .then((response) => response.data),
  updateTodo: (title, description, createdDate, deadline, inProgress) =>
    instance
      .post('todos/update', {
        title,
        description,
        createdDate,
        deadline,
        inProgress,
      })
      .then((response) => response.data),
  addTodo: (title, description, deadline) =>
    instance
      .put('todos/add', {title, description, deadline})
      .then((response) => response.data),
};

export const userAPI = {
  login: (login, password) =>
    instance
      .post('user/login', {login, password})
      .then((response) => response.data),
};
