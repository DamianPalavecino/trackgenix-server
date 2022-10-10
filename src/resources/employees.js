const express = require('express');
const fs = require('fs');
const employees = require('../data/employees.json');

const router = express.Router();

router.get('/getAll', (req, res) => {
  res.send(employees);
});

router.get('/getById/:id', (req, res) => {
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

router.post('/add', (req, res) => {
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

router.delete('/delete/:id', (req, res) => {
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

router.put('/change/:id', (req, res) => {
  const employeeId = req.params.id;
  const newEmployee = req.body;
  const foundEmployee = employees.find(
    (employee) => employee.id === employeeId,
  );
  Object.keys(foundEmployee).forEach((key) => {
    if (foundEmployee[key] !== newEmployee[key]) {
      foundEmployee[key] = newEmployee[key];
    }
  });
  fs.writeFile('src/data/employees.json', JSON.stringify(employees), (err) => {
    if (err) {
      res.send('Cannot change employee');
    } else {
      res.send('Employee changed');
    }
  });
});

module.exports = router;
