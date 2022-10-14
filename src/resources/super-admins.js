const express = require('express');
const fs = require('fs');
const superAdmins = require('../data/super-admins.json');

const router = express.Router();

router.get('/', (req, res) => {
  res.send(superAdmins);
});

router.get('/:id', (req, res) => {
  const superAdminId = req.params.id;
  const superAdminFound = superAdmins.find((superAdmin) => superAdmin.id === superAdminId);
  if (superAdminFound) {
    res.send(superAdminFound);
  } else {
    res.send('Cannot find Super Admin');
  }
});

router.post('/', (req, res) => {
  const newsuperAdmin = req.body;
  superAdmins.push(newsuperAdmin);
  fs.writeFile('src/data/super-admins.json', JSON.stringify(superAdmins), (err) => {
    if (err) {
      res.send('Cannot add Super Admin');
    } else {
      res.send('Super Admin created');
    }
  });
});

module.exports = router;
