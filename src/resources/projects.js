const express = require('express');
const fs = require('fs');

const projects = require('../data/projects.json');

const router = express.Router();

// const createProject = () => {};
// const editProject = () => {};
// const deleteProject = () => {};
// const addEmployeeProject = () => {};

// const getProject = () => {};
router.get('/getById/:id', (req, res) => {
  const projectId = req.params.id;
  const foundProject = projects.find((project) => project.id === projectId);
  if (foundProject) {
    res.send(foundProject);
  } else {
    res.send('Project not found');
  }
});

// const listProject = () => {};
router.get('/getAll', (req, res) => {
  res.send(projects);
});

router.post('/add', (req, res) => {
  const newProject = req.body;
  projects.push(newProject);
  fs.writeFile('src/data/projects.json', JSON.stringify(projects), (err) => {
    if (err) {
      res.send('Cannot save new user');
    } else {
      res.send('Project create');
    }
  });
});

router.delete('/deleted/:id', (req, res) => {
  const projectId = req.params.id;
  const filteredProject = projects.filter((project) => project.id !== projectId);
  fs.writeFile('src/data/projects.json', JSON.stringify(filteredProject), (err) => {
    if (err) {
      res.send('Cannot deleted Project');
    } else {
      res.send('Project deleted');
    }
  });
});

module.exports = router;
