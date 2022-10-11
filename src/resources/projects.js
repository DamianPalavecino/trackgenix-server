const express = require('express');
const fs = require('fs');
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

router.post('/add', (req, res) => {
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

router.delete('/delete/:id', (req, res) => {
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

router.put('/change/:id', (req, res) => {
  const projectId = req.params.id;
  const newProject = req.body;
  const foundProject = projects.find(
    (project) => project.id === projectId,
  );
  const i = projects.findIndex((project) => project.id === projectId);
  if (newProject.name) {
    foundProject.name = newProject.name;
  }
  if (newProject.password) {
    foundProject.password = newProject.password;
  }
  if (newProject.members) {
    foundProject.members = newProject.members;
  }
  projects[i] = foundProject;
  fs.writeFile('src/data/projects.json', JSON.stringify(projects), (err) => {
    if (err) {
      res.send('Cannot change project');
    } else {
      res.send('Project changed');
    }
  });
});

module.exports = router;

// ordenar el json= shift + alt +f
