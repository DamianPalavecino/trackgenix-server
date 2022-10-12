const express = require('express');
const fs = require('fs');
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

router.put('/:id', (req, res) => {
  const employeeId = req.params.id;
  const newEmployee = req.body;
  const foundEmployee = employees.find(
    (employee) => employee.id === employeeId,
  );
  const i = employees.findIndex((employee) => employee.id === employeeId);
  if (newEmployee.firstName) {
    foundEmployee.firstName = newEmployee.firstName;
  }
  if (newEmployee.lastName) {
    foundEmployee.lastName = newEmployee.lastName;
  }
  if (newEmployee.dni) {
    foundEmployee.dni = newEmployee.dni;
  }
  if (newEmployee.projects) {
    foundEmployee.projects = newEmployee.projects;
  }
  employees[i] = foundEmployee;
  fs.writeFile('src/data/employees.json', JSON.stringify(employees), (err) => {
    if (err) {
      res.send('Cannot change employee');
    } else {
      res.send('Employee changed');
    }
  });
});

module.exports = router;
