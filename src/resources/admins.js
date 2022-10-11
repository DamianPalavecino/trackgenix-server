const express = require('express');
const fs = require('fs');
const admins = require('../data/admins.json');

const router = express.Router();

router.get('/getAll', (req, res) => {
  res.send(admins);
});

router.get('/getById/:id', (req, res) => {
  const adminId = req.params.id;
  const adminFound = admins.find((admin) => admin.id === adminId);
  if (adminFound) {
    res.send(adminFound);
  } else {
    res.send('Cannot find admin');
  }
});

router.post('/add', (req, res) => {
  const newAdmin = req.body;
  admins.push(newAdmin);
  fs.writeFile('src/data/admins.json', JSON.stringify(admins), (err) => {
    if (err) {
      res.send('Cannot add admin');
    } else {
      res.send('Admin created');
    }
  });
});

module.exports = router;
