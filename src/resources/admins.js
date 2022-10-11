const express = require('express');
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

module.exports = router;
