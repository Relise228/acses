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
