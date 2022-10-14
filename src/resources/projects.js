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
  const foundProjects = projects.find((project) => project.id === projectId);
  if (!foundProjects) {
    res.send('Project not found');
  } else {
    const filteredProjects = projects.filter((project) => project.id !== projectId);
    fs.writeFile('src/data/projects.json', JSON.stringify(filteredProjects), (err) => {
      if (err) {
        res.send('Cannot delete project');
      } else {
        res.send('Project deleted');
      }
    });
  }
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
