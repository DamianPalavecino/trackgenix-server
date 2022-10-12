const express = require('express');
const fs = require('fs');

const router = express.Router();
const tasks = require('../data/tasks.json');

router.get('/', (req, res) => {
  res.send(tasks);
});

router.get('/:id', (req, res) => {
  const taskId = req.params.id;
  const foundTask = tasks.find((task) => task.id === taskId);
  if (foundTask) {
    res.send(foundTask);
  } else {
    res.send('Task not found.');
  }
});

router.get('/filterByProject/:project', (req, res) => {
  const taskProject = req.params.project;
  const foundTasks = tasks.filter((task) => task.project === taskProject);
  if (foundTasks) {
    res.send(foundTasks);
  } else {
    res.send('No task was found in that project.');
  }
});

router.get('/filterByStatus/:status', (req, res) => {
  const taskStatus = req.params.status;
  const foundTasks = tasks.filter((task) => task.status === taskStatus);
  if (foundTasks) {
    res.send(foundTasks);
  } else {
    res.send('No tas was found with that status.');
  }
});

router.post('/', (req, res) => {
  const newTask = req.body;
  tasks.push(newTask);
  fs.writeFile('src/data/tasks.json', JSON.stringify(tasks), (err) => {
    if (err) {
      res.send('Cannot add new task.');
    } else {
      res.send('Task added.');
    }
  });
});

router.delete('/:id', (req, res) => {
  const taskId = req.params.id;
  const filteredTask = tasks.filter((task) => task.id !== taskId);
  fs.writeFile('src/data/tasks.json', JSON.stringify(filteredTask), (err) => {
    if (err) {
      res.send('Cannot delete task.');
    } else {
      res.send('Task deleted.');
    }
  });
});

router.put('/:id', (req, res) => {
  const taskId = req.params.id;
  const editedTask = req.body;
  const foundTask = tasks.find((task) => task.id === taskId);
  const keys = Object.keys(foundTask);
  for (let i = 0; i < keys.length; i += 1) {
    if (foundTask.key !== 'id') foundTask.key = editedTask.key;
  }
  const i = tasks.findIndex((task) => task.id === taskId);
  tasks[i] = editedTask;
  fs.writeFile('src/data/tasks.json', JSON.stringify(tasks), (err) => {
    if (err) {
      res.send('Cannot edit task.');
    } else {
      res.send('Task edited.');
    }
  });
});

module.exports = router;
