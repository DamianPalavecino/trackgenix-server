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
  if (newArray.length > 0) {
    res.send(newArray);
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
