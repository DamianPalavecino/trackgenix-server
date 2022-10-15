const express = require('express');
const fs = require('fs');
const admins = require('../data/admins.json');

const router = express.Router();

router.get('/', (req, res) => {
  res.send(admins);
});

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
  const newAdmin = req.body;
  const foundAdmin = admins.find((admin) => admin.id === adminId);
  const index = admins.findIndex((admin) => admin.id === adminId);
  if (newAdmin.firstName) {
    foundAdmin.firstName = newAdmin.firstName;
  }
  if (newAdmin.lastName) {
    foundAdmin.lastName = newAdmin.lastName;
  }
  if (newAdmin.email) {
    foundAdmin.email = newAdmin.email;
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
