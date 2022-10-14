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

router.delete('/:id', (req, res) => {
  const superAdminId = req.params.id;
  const foundSuperAdmins = superAdmins.find((superAdmin) => superAdmin.id === superAdminId);
  if (!foundSuperAdmins) {
    res.send('Project not found');
  } else {
    const filteredsuperAdmins = superAdmins.filter((superAdmin) => superAdmin.id !== superAdminId);
    fs.writeFile('src/data/superAdmins.json', JSON.stringify(filteredsuperAdmins), (err) => {
      if (err) {
        res.send('Cannot delete superAdmin');
      } else {
        res.send('superAdmin deleted');
      }
    });
  }
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
