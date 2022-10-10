const express = require('express');
const projects = require('../data/projects.json');

const router = express.Router();

router.get('/getAll', (req, res) => {
  res.send(projects);
});

router.get('/getById/:id', (req, res) => {
  const projectId = req.params.id;
  const projectFound = projects.find((project) => project.id === projectId);
  if (projectFound) {
    res.send(projectFound);
  } else {
    res.send('project not found');
  }
});

module.exports = router;
