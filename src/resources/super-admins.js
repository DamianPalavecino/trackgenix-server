const express = require('express');
const fs = require('fs');
const superAdmins = require('../data/super-admins.json');

const router = express.Router();

router.delete('/:id', (req, res) => {
  const superAdminId = req.params.id;
  const filteredsuperAdmins = superAdmins.filter((superAdmin) => superAdmin.id !== superAdminId);
  fs.writeFile('src/data/superAdmins.json', JSON.stringify(filteredsuperAdmins), (err) => {
    if (err) {
      res.send('Cannot delete superAdmin');
    } else {
      res.send('superAdmin deleted');
    }
  });
});

router.put('/:id', (req, res) => {
  const superAdminId = req.params.id;
  const newSuperAdmin = req.body;
  const foundSuperAdmin = superAdmins.find((superAdmin) => superAdmin.id === superAdminId);
  const index = superAdmins.findIndex((superAdmin) => superAdmin.id === superAdminId);
  if (newSuperAdmin.firstName) {
    foundSuperAdmin.firstName = newSuperAdmin.firstName;
  }
  if (newSuperAdmin.lastName) {
    foundSuperAdmin.lastName = newSuperAdmin.lastName;
  }
  if (newSuperAdmin.email) {
    foundSuperAdmin.email = newSuperAdmin.email;
  }
  superAdmins[index] = foundSuperAdmin;
  fs.writeFile('src/data/superAdmins.json', JSON.stringify(superAdmins), (err) => {
    if (err) {
      res.send('Cannot modify superAdmin');
    } else {
      res.send('superAdmin modified');
    }
  });
});

module.exports = router;
