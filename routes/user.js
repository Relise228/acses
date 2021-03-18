const express = require('express');
const router = express.Router();
const fs = require('fs');

const path = require('path');

const file = path.join(__dirname, '../data/user.json');

router.get('/', async (req, res) => {
  try {
    let user = JSON.parse(fs.readFileSync(file));
    res.send(user);
  } catch (error) {
    res.status(500).send(error);
  }
});

router.post('/update', async (req, res) => {
  try {
    let user = JSON.parse(fs.readFileSync(file));

    const {firstName, lastName, icon} = req.body;

    user = {...user, firstName: firstName, lastName: lastName, icon: icon};

    fs.writeFileSync(file, JSON.stringify(user));

    let data = await JSON.parse(fs.readFileSync(file));

    res.send(data);
  } catch (error) {
    res.status(500).send(error);
  }
});

router.post('/login', async (req, res) => {
  try {
    let user = JSON.parse(fs.readFileSync(file));

    const {login, password} = req.body;

    if (user.login === login && user.password === password) {
      res.send({verify: true});
    } else {
      res.send({error: 'Incorrect login or password'});
    }
  } catch (error) {
    res.status(500).send(error);
  }
});

module.exports = router;
