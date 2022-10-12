const express = require('express');
const fs = require('fs');
const admins = require('../data/admins.json');

const router = express.Router();

router.delete('/:id', (req, res) => {
  const adminId = req.params.id;
  const filteredAdmins = admins.filter((admin) => admin.id !== adminId);
  fs.writeFile('src/data/admins.json', JSON.stringify(filteredAdmins), (err) => {
    if (err) {
      res.send('Cannot delete admin');
    } else {
      res.send('admin deleted');
    }
  });
});

router.put('/:id', (req, res) => {
  const adminId = req.params.id;
  const newadmin = req.body;
  const foundAdmin = admins.find((admin) => admin.id === adminId);
  const index = admins.findIndex((admin) => admin.id === adminId);
  if (newadmin.firstName) {
    foundAdmin.firstName = newadmin.firstName;
  }
  if (newadmin.lastName) {
    foundAdmin.lastName = newadmin.lastName;
  }
  if (newadmin.email) {
    foundAdmin.email = newadmin.email;
  }
  admins[index] = foundAdmin;
  fs.writeFile('src/data/admins.json', JSON.stringify(admins), (err) => {
    if (err) {
      res.send('Cannot modify admin');
    } else {
      res.send('admin modified');
    }
  });
});

router.get('/:id', (req, res) => {
  const adminId = req.params.id;
  const adminFound = admins.find((admin) => admin.id === adminId);
  if (adminFound) {
    res.send(adminFound);
  } else {
    res.send('Cannot find admin');
  }
});

router.post('/', (req, res) => {
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
