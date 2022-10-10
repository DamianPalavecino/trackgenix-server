const express = require('express');
// const fs = require('fs');

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
module.exports = router;
