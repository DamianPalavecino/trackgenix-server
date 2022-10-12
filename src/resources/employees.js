const express = require('express');
const fs = require('fs');
const employees = require('../data/employees.json');

const router = express.Router();

router.get('/', (req, res) => {
  res.send(employees);
});

router.get('/:id', (req, res) => {
  const employeeId = req.params.id;
  const foundEmployee = employees.find(
    (employee) => employee.id === employeeId,
  );
  if (foundEmployee) {
    res.send(foundEmployee);
  } else {
    res.send('Employee not found');
  }
});

router.post('/', (req, res) => {
  const newEmployee = req.body;
  employees.push(newEmployee);
  fs.writeFile('src/data/employees.json', JSON.stringify(employees), (err) => {
    if (err) {
      res.send('Cannot save new employee');
    } else {
      res.send('Employee created');
    }
  });
});

router.delete('/:id', (req, res) => {
  const employeeId = req.params.id;
  const filteredEmployees = employees.filter(
    (employee) => employee.id !== employeeId,
  );
  fs.writeFile(
    'src/data/employees.json',
    JSON.stringify(filteredEmployees),
    (err) => {
      if (err) {
        res.send('Cannot delete employee');
      } else {
        res.send('Employee deleted');
      }
    },
  );
});

module.exports = router;
