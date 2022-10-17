// const express = require('express');
// const fs = require('fs');
// const employees = require('../data/employees.json');

// const router = express.Router();

// router.get('/', (req, res) => {
//   res.send(employees);
// });

// router.get('/:id', (req, res) => {
//   const employeeId = req.params.id;
//   const foundEmployee = employees.find(
//     (employee) => employee.id === employeeId,
//   );
//   if (foundEmployee) {
//     res.send(foundEmployee);
//   } else {
//     res.send('Employee not found');
//   }
// });

// router.get('/getByRate/:rate', (req, res) => {
//   const { rate } = req.params;
//   const rateNumber = Number(rate);
//   const newArray = [];
//   employees.forEach((employee) => {
//     employee.projects.forEach((project) => {
//       if (project.rate === rateNumber) {
//         newArray.push(employee);
//       }
//     });
//   });
//   if (newArray.length > 0) {
//     res.send(newArray);
//   } else {
//     res.send('Employee not found');
//   }
// });

// router.post('/', (req, res) => {
//   const newEmployee = req.body;
//   employees.push(newEmployee);
//   fs.writeFile('src/data/employees.json', JSON.stringify(employees), (err) => {
//     if (err) {
//       res.send('Cannot save new employee');
//     } else {
//       res.send('Employee created');
//     }
//   });
// });

// router.put('/:id', (req, res) => {
//   const employeeId = req.params.id;
//   const newEmployee = req.body;
//   const foundEmployee = employees.find(
//     (employee) => employee.id === employeeId,
//   );
//   const i = employees.findIndex((employee) => employee.id === employeeId);
//   if (newEmployee.firstName) {
//     foundEmployee.firstName = newEmployee.firstName;
//   }
//   if (newEmployee.lastName) {
//     foundEmployee.lastName = newEmployee.lastName;
//   }
//   if (newEmployee.dni) {
//     foundEmployee.dni = newEmployee.dni;
//   }
//   if (newEmployee.projects) {
//     foundEmployee.projects = newEmployee.projects;
//   }
//   employees[i] = foundEmployee;
//   fs.writeFile('src/data/employees.json', JSON.stringify(employees), (err) => {
//     if (err) {
//       res.send('Cannot change employee');
//     } else {
//       res.send('Employee changed');
//     }
//   });
// });

// router.delete('/:id', (req, res) => {
//   const employeeId = req.params.id;
//   const filteredEmployees = employees.filter(
//     (employee) => employee.id !== employeeId,
//   );
//   fs.writeFile(
//     'src/data/employees.json',
//     JSON.stringify(filteredEmployees),
//     (err) => {
//       if (err) {
//         res.send('Cannot delete employee');
//       } else {
//         res.send('Employee deleted');
//       }
//     },
//   );
// });

import Employees from '../models/employees';

const getAllEmployees = async (req, res) => {
  try {
    const employees = await Employees.find();

    return res.status(200).json({
      message: 'Employee found',
      data: employees,
      error: false,
    });
  } catch (error) {
    return res.json({
      message: 'An error occurred',
      data: undefined,
      error: true,
    });
  }
};

const getEmployeeById = async (req, res) => {
  try {
    const { id } = req.params;
    const employees = await Employees.findById(id);

    return res.status(200).json({
      message: 'Employee found',
      data: employees,
      error: false,
    });
  } catch (error) {
    return res.json({
      message: 'An error occurred',
      data: undefined,
      error: true,
    });
  }
};

const createEmployee = async (req, res) => {
  try {
    const employee = new Employees({
      name: req.body.name,
      lastName: req.body.lastName,
      phone: req.body.phone,
      email: req.body.email,
      password: req.body.password,
    });

    const result = await employee.save();
    return res.status(201).json({
      message: 'Employee successfully created',
      data: result,
      error: false,
    });
  } catch (error) {
    return res.json({
      message: 'An error occurred',
      data: undefined,
      error: true,
    });
  }
};

export default {
  getAllEmployees,
  getEmployeeById,
  createEmployee,
};
