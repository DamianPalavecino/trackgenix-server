const express = require('express');
const fs = require('fs');

const projects = require('../data/projects.json');

const router = express.Router();

router.get('/getById/:id', (req, res) => {
  const projectId = req.params.id;
  const foundProject = projects.find((project) => project.id === projectId);
  if (foundProject) {
    res.send(foundProject);
  } else {
    res.send('Project not found');
  }
});

router.get('/getAll', (req, res) => {
  res.send(projects);
});

router.post('/add', (req, res) => {
  const newProject = req.body;
  projects.push(newProject);
  fs.writeFile('src/data/projects.json', JSON.stringify(projects), (err) => {
    if (err) {
      res.send('Cannot save new project');
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

router.put('/edit/:id', (req, res) => {
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
  if (newProject.id) {
    foundProject.id = newProject.id;
  }
  projects[i] = foundProject;
  fs.writeFile('src/data/projects.json', JSON.stringify(projects), (err) => {
    if (err) {
      res.send('Cannot edit project');
    } else {
      res.send('Employee edited');
    }
  });
});

router.put('/addE/:id', (req, res) => {
  const projectId = req.params.id;
  const newEmployee = req.body;
  const foundProject = projects.find(
    (project) => project.id === projectId,
  );
  const { members } = foundProject;
  if (members.find((member) => member.id === newEmployee.id)) {
    res.send('Employee already exist');
  } else {
    foundProject.members.push(newEmployee);
    fs.writeFile('src/data/projects.json', JSON.stringify(projects), (err) => {
      if (err) {
        res.send('Cannot add employee');
      } else {
        res.status(200).send({ message: 'Employee added' });
      }
    });
  }
});

router.get('/getByRole/:role', (req, res) => {
  const { role } = req.params;
  const newArray = [];
  projects.forEach((project) => {
    project.members.forEach((member) => {
      if (member.role === role) {
        newArray.push(project);
      }
    });
  });
  if (newArray) {
    res.send(newArray);
  } else {
    res.send('Employee not found');
  }
});
module.exports = router;
