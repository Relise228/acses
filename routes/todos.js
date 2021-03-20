const express = require('express');
const router = express.Router();
const fs = require('fs');

const path = require('path');
const {toArray} = require('../util/util');

const file = path.join(__dirname, '../data/todos.json');
const fileUser = path.join(__dirname, '../data/user.json');

router.get('/', async (req, res) => {
  try {
    let todos = JSON.parse(fs.readFileSync(file));

    res.send(toArray(todos));
  } catch (error) {
    res.status(500).send(error);
  }
});

router.put('/add', async (req, res) => {
  try {
    let todos = JSON.parse(fs.readFileSync(file));
    let user = JSON.parse(fs.readFileSync(fileUser));
    let lastkey = Object.keys(todos).length;

    todos[lastkey] = {...req.body, inProgress: true, createdDate: new Date()};
    user = {
      ...user,
      createdTodo: user.createdTodo + 1,
      activeTodo: user.activeTodo + 1,
    };

    fs.writeFileSync(file, JSON.stringify(todos));
    fs.writeFileSync(fileUser, JSON.stringify(user));

    let data = await JSON.parse(fs.readFileSync(file));

    res.send(toArray(data));
  } catch (error) {
    res.status(500).send(error);
  }
});

router.post('/close', async (req, res) => {
  try {
    let todos = JSON.parse(fs.readFileSync(file));
    let user = JSON.parse(fs.readFileSync(fileUser));

    const {createdDate} = req.body;

    for (key in todos) {
      if (todos[key].createdDate === createdDate) {
        todos[key] = {
          ...todos[key],
          inProgress: false,
        };
      }
    }

    user = {
      ...user,
      closedTodo: user.closedTodo + 1,
      activeTodo: user.activeTodo - 1,
    };

    fs.writeFileSync(file, JSON.stringify(todos));
    fs.writeFileSync(fileUser, JSON.stringify(user));

    let data = await JSON.parse(fs.readFileSync(file));

    res.send(toArray(data));
  } catch (error) {
    res.status(500).send(error);
  }
});

router.post('/update', async (req, res) => {
  try {
    let todos = JSON.parse(fs.readFileSync(file));

    const {title, description, createdDate, deadline, inProgress} = req.body;

    for (key in todos) {
      if (todos[key].createdDate === createdDate) {
        todos[key] = {
          title,
          description,
          createdDate,
          deadline,
          inProgress,
        };
      }
    }

    fs.writeFileSync(file, JSON.stringify(todos));

    let data = await JSON.parse(fs.readFileSync(file));

    res.send(toArray(data));
  } catch (error) {
    res.status(500).send(error);
  }
});

router.delete('/delete', async (req, res) => {
  try {
    let todos = JSON.parse(fs.readFileSync(file));
    let user = JSON.parse(fs.readFileSync(fileUser));
    const {createdDate} = req.body;

    for (key in todos) {
      if (todos[key].createdDate === createdDate) {
        user = {
          ...user,
          deletedTodo: user.deletedTodo + 1,
          activeTodo: user.activeTodo - 1,
        };
        delete todos[key];
      }
    }

    fs.writeFileSync(file, JSON.stringify(todos));
    fs.writeFileSync(fileUser, JSON.stringify(user));

    let data = await JSON.parse(fs.readFileSync(file));

    res.send(toArray(data));
  } catch (error) {
    res.status(500).send(error);
  }
});

module.exports = router;
