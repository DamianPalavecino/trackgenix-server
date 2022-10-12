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
      res.send('Admin modified');
    }
  });
});

module.exports = router;
