import Employees from '../models/employees';

const getAllEmployees = async (req, res) => {
  try {
    const employees = await Employees.find();

    if (employees.length === 0) {
      return res.status(404).json({
        message: 'No employees found',
        data: undefined,
        error: true,
      });
    }

    return res.status(200).json({
      message: 'Employees found',
      data: employees,
      error: false,
    });
  } catch (error) {
    return res.status(400).json({
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

    if (employees === null) {
      res.status(404).json({
        message: 'Invalid ID',
        data: undefined,
        error: true,
      });
    }
    return res.status(200).json({
      message: 'Employee found',
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
    return res.status(400).json({
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
