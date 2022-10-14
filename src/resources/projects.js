const express = require('express');
const fs = require('fs');
const projects = require('../data/projects.json');

const router = express.Router();

router.get('/', (req, res) => {
  res.send(projects);
});

router.get('/:id', (req, res) => {
  const projectId = req.params.id;
  const projectFound = projects.find((project) => project.id === projectId);
  if (projectFound) {
    res.send(projectFound);
  } else {
    res.send('project not found');
  }
});

router.post('/', (req, res) => {
  const newProject = req.body;
  projects.push(newProject);
  fs.writeFile('src/data/projects.json', JSON.stringify(projects), (err) => {
    if (err) {
      res.send('cannot save project');
    } else {
      res.send('project created');
    }
  });
});

router.delete('/:id', (req, res) => {
  const projectId = req.params.id;
  const filteredProjects = projects.filter((project) => project.id !== projectId);
  fs.writeFile('src/data/projects.json', JSON.stringify(filteredProjects), (err) => {
    if (err) {
      res.send('Cannot delete project');
    } else {
      res.send('Project deleted');
    }
  });
});

module.exports = router;
