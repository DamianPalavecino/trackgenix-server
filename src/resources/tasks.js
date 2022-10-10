const express = require('express');
const fs = require('fs');

const router = express.Router();
const tasks = require('../data/tasks.json');

router.get('/getAll', (req, res) => {
  res.send(tasks);
});
router.get('/getById/:id', (req, res) => {
  const taskId = req.params.id;
  const foundTask = tasks.find((task) => task.id === taskId);
  if (foundTask) {
    res.send(foundTask);
  } else {
    res.send('Task not found.');
  }
});
router.post('/add', (req, res) => {
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
router.delete('/delete/:id', (req, res) => {
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
module.exports = router;
