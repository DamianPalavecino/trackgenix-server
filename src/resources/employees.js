const express = require('express');
const employees = require('../data/employees.json');

const router = express.Router();

router.get('/getByRate/:rate', (req, res) => {
  const { rate } = req.params;
  const rateNumber = Number(rate);
  const newArray = [];
  employees.forEach((employee) => {
    employee.projects.forEach((project) => {
      if (project.rate === rateNumber) {
        newArray.push(employee);
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
