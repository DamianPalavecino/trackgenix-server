import firebase from '../helpers/firebase';
import Employees from '../models/Employees';

const { ObjectId } = require('mongoose').Types;

const getAllEmployees = async (req, res) => {
  try {
    const employees = await Employees.find().populate('projects');
    const queryParams = Object.keys(req.query);
    const find = await Employees.find(req.query).populate('projects');
    const keysProjects = ['name', 'lastName', 'phone', 'email'];
    let includes = true;

    if (queryParams.length <= 0) {
      if (employees.length <= 0 || employees === null) {
        return res.status(404).json({
          message: 'There are no employees to show',
          data: undefined,
          error: true,
        });
      }
      return res.status(200).json({
        message: 'Employees were found successfully',
        data: employees,
        error: false,
      });
    }

    queryParams.forEach((element) => {
      if (!keysProjects.includes(element)) {
        includes = false;
      }
      return includes;
    });
    if (!includes) {
      return res.status(400).json({
        message: 'An error occurred',
        data: undefined,
        error: true,
      });
    }

    if (find.length > 0) {
      return res.status(200).json({
        message: find.length === 1 ? 'Employee was found successfully' : 'Employees were found successfully',
        data: find,
        error: false,
      });
    }
    return res.status(404).json({
      message: 'Employee not found',
      data: undefined,
      error: true,
    });
  } catch (error) {
    return res.json({
      message: `An error ocurred: ${error}`,
      data: undefined,
      error: true,
    });
  }
};

const getEmployeeById = async (req, res) => {
  try {
    const { id } = req.params;
    if (!ObjectId.isValid(id)) {
      return res.status(400).json({
        message: `Employee with ID ${id} was not found`,
        data: undefined,
        error: true,
      });
    }
    const employees = await Employees.findById(id).populate('projects');
    if (!employees) {
      return res.status(404).json({
        message: 'Employee not found',
        data: undefined,
        error: true,
      });
    }
    return res.status(200).json({
      message: 'Employee was found successfully',
      data: employees,
      error: false,
    });
  } catch (error) {
    return res.json({
      message: `An error ocurred: ${error}`,
      date: undefined,
      error: true,
    });
  }
};

const createEmployee = async (req, res) => {
  try {
    const newFirebaseUser = await firebase.auth().createUser({
      email: req.body.email,
      password: req.body.password,
    });

    await firebase.auth().setCustomUserClaims(newFirebaseUser.uid, { role: 'EMPLOYEE' });

    const employee = new Employees({
      name: req.body.name,
      lastName: req.body.lastName,
      phone: req.body.phone,
      email: req.body.email,
      projects: req.body.projects,
      status: false,
      firebaseUid: newFirebaseUser.uid,
    });
    const result = await employee.save();
    return res.status(201).json({
      message: 'Employee was created successfully',
      data: result,
      error: false,
    });
  } catch (error) {
    return res.status(400).json({
      message: error.message || error,
      data: undefined,
      error: true,
    });
  }
};

const deleteEmployee = async (req, res) => {
  try {
    const { id } = req.params;
    const employee = await Employees.findByIdAndDelete(id);
    await firebase.auth().deleteUser(employee.firebaseUid);
    if (!employee) {
      throw new Error({
        message: 'Employee not found',
        status: 404,
      });
    }
    return res.status(204).send();
  } catch (error) {
    return res.json({
      message: `Server error: ${error}`,
      error: true,
    });
  }
};

const editEmployee = async (req, res) => {
  try {
    const { id } = req.params;
    if (!ObjectId.isValid(id)) {
      return res.status(400).json({
        message: 'Invalid ID',
        data: undefined,
        error: true,
      });
    }
    if (Object.entries(req.body).length === 0) {
      return res.status(400).json({
        message: 'You must edit at least one field',
        data: undefined,
        error: true,
      });
    }

    const employee = await Employees.findById(id).populate('projects');
    if (!employee) {
      return res.status(404).json({
        message: 'Employee does not exist',
        data: undefined,
        error: true,
      });
    }

    if (req.body.email && req.body.password) {
      await firebase.auth().updateUser(employee.firebaseUid, {
        email: req.body.email,
        password: req.body.password,
      });
    }
    const result = await Employees.findByIdAndUpdate(
      { _id: id },
      { ...req.body },
      { new: true },
    ).populate('projects');

    return res.status(200).json({
      message: `Employee with id ${id} edited successfully`,
      data: result,
      error: false,
    });
  } catch (error) {
    return res.json({
      message: `Server error: ${error}`,
      data: undefined,
      error: true,
    });
  }
};

export default {
  getAllEmployees,
  getEmployeeById,
  createEmployee,
  deleteEmployee,
  editEmployee,
};
