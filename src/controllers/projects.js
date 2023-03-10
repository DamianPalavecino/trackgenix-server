import Projects from '../models/Projects';
import Employees from '../models/Employees';

const { ObjectId } = require('mongoose').Types;

const error400 = (res, msg) => res.status(400).json({
  message: `There was an error: ${msg}`,
  data: undefined,
  error: true,
});

const error404 = (res, msg) => res.status(404).json({
  message: `There was an error: ${msg}`,
  data: undefined,
  error: true,
});

const createProject = async (req, res) => {
  try {
    const project = new Projects({
      name: req.body.name,
      description: req.body.description,
      startDate: req.body.startDate,
      endDate: req.body.endDate,
      clientName: req.body.clientName,
      employees: req.body.employees,
      status: false,
    });
    const result = await project.save();
    return res.status(201).json({
      message: 'Project created successfully',
      data: result,
      error: false,
    });
  } catch (error) {
    return res.status(400).json({
      message: `An error ocurred: ${error}`,
      data: undefined,
      error: true,
    });
  }
};

const getAllProjects = async (req, res) => {
  try {
    const projectsAll = await Projects.find().populate('employees.employeeId');
    const queryParams = Object.keys(req.query);
    const find = await Projects.find(req.query);
    const keysProjects = ['name', 'employees', 'startDate', 'endDate', 'description', 'clientName'];
    let includes = true;

    if (queryParams.length <= 0) {
      if (projectsAll.length <= 0 || projectsAll === null) {
        return error404(res, 'There are no projects to display');
      }
      return res.status(200).json({
        message: 'Projects found',
        data: projectsAll,
        error: false,
      });
    }

    queryParams.forEach((element) => {
      element.toLowerCase();
      if (!keysProjects.includes(element)) {
        includes = false;
      }
      return includes;
    });
    if (!includes) return error400(res, 'ID param is empty');

    if (find.length > 0) {
      return res.status(200).json({
        message: find.length === 1 ? 'Project found' : 'Projects found',
        data: find,
        error: false,
      });
    }
    return error404(res, 'Project not found');
  } catch (error) {
    return res.json({
      message: `An error ocurred: ${error}`,
      data: undefined,
      error: true,
    });
  }
};

const getProjectById = async (req, res) => {
  try {
    const { id } = req.params;
    if (!ObjectId.isValid(id)) return error400(res, `The ID ${id} is not valid`);

    const project = await Projects.findById(id).populate('employees.employeeId');
    if (!project) return error404(res, `Project with ID ${id} was not found`);

    return res.status(200).json({
      message: 'Project found',
      data: project,
      error: false,
    });
  } catch (error) {
    return res.status(400).json({
      message: `${error}`,
      data: undefined,
      error: true,
    });
  }
};

const deleteProject = async (req, res) => {
  try {
    const { id } = req.params;
    if (!ObjectId.isValid(id)) return error400(res);

    const findById = await Projects.findById(id);
    if (!findById) return error404(res, 'Project was not found');

    await Projects.deleteOne({ _id: id });

    return res.status(204).json();
  } catch (error) {
    return res.status(400).json({
      message: `${error}`,
      data: undefined,
      error: true,
    });
  }
};

const updateProject = async (req, res) => {
  try {
    const { id } = req.params;
    if (!ObjectId.isValid(id)) return error400(res, `The ID ${id} is not valid`);

    const updatedProject = req.body;

    if (Object.entries(updatedProject).length === 0 || !updatedProject) {
      return error400(res, 'Edited project is empty');
    }
    const project = await Projects.findById(id);
    if (!project) return error404(res, 'Project was not found');

    const result = await Projects.findByIdAndUpdate(id, updatedProject, { new: true });

    return res.status(200).json({
      message: 'Project has been edited successfully',
      data: result,
      error: false,
    });
  } catch (error) {
    return res.status.json({
      message: `${error}`,
      data: undefined,
      error: true,
    });
  }
};

const addEmployee = async (req, res) => {
  try {
    const { id } = req.params;
    if (!ObjectId.isValid(id)) return error400(res, `The ID ${id} is not valid`);

    const project = await Projects.findById(id);
    if (!project) return error404(res, 'Project was not found');

    const newEmployee = req.body;
    const foundEmployee = await Employees.findById(newEmployee.employeeId);
    if (!foundEmployee) return error404(res, 'Employee was not found');
    // eslint-disable-next-line no-underscore-dangle
    const employeeExists = project.employees
      .some((elem) => elem.employeeId.toString() === newEmployee.employeeId);
    if (employeeExists) return error400(res, 'The employee was already assigned in the project');
    if (req.body.role === 'PM') {
      const hasProjectManager = project.employees.some((employee) => employee.role === 'PM');
      if (hasProjectManager) return error400(res, 'The project already has a Project Manager assigned');
      foundEmployee.isProjectManager = true;
      await foundEmployee.save();
    }

    const addEmployeedProject = await Projects.findByIdAndUpdate(
      { _id: id },
      {
        $push: {
          employees: {
            employeeId: newEmployee.employeeId,
            rate: newEmployee.rate,
            role: newEmployee.role,
          },
        },
      },
      { new: true },
    );

    await Employees.findByIdAndUpdate(
      { _id: newEmployee.employeeId },
      {
        $push: {
          projects: id,
        },
      },
      { new: true },
    );

    return res.status(201).json({
      message: 'Employee has been added successfully',
      data: addEmployeedProject,
      error: false,
    });
  } catch (error) {
    return res.status(400).json({
      message: `${error}`,
      data: undefined,
      error: true,
    });
  }
};

const deleteEmployee = async (req, res) => {
  try {
    const { id, employee } = req.params;
    if (!ObjectId.isValid(id)) return error400(res);
    const project = await Projects.findById(id);
    if (!project) return error404(res, 'Project was not found');
    const foundEmployee = await Employees.findById(employee);
    if (!foundEmployee) return error404(res, 'Employee was not found');
    // eslint-disable-next-line no-underscore-dangle
    const employeeExists = project.employees.some((elem) => elem.employeeId.toString()
    === employee);
    if (!employeeExists) return error400(res, 'The employee does not exist in the project');
    await Projects.findOneAndUpdate(
      { _id: project },
      { $pull: { employees: { employeeId: employee } } },
    );
    await Employees.updateOne(
      { _id: employee },
      // eslint-disable-next-line no-underscore-dangle
      { $pull: { projects: project._id } },
    );
    return res.status(200).json({
      message: 'Employee has been deleted successfully',
      error: false,
    });
  } catch (error) {
    return res.status(400).json({
      message: `${error}`,
      data: undefined,
      error: true,
    });
  }
};

const editEmployee = async (req, res) => {
  try {
    const { id } = req.params;
    if (!ObjectId.isValid(id)) return error400(res);
    const project = await Projects.findById(id);
    if (!project) return error404(res, 'Project was not found');
    const { employeeId: employee } = req.body;
    const foundEmployee = await Employees.findById(employee);
    if (!foundEmployee) return error404(res, 'Employee was not found');
    // eslint-disable-next-line no-underscore-dangle
    const employeeExists = project.employees.some((elem) => elem.employeeId.toString()
    === employee);
    if (!employeeExists) return error400(res, 'The employee does not exist in the project');
    await Projects.updateOne(
      { _id: project, 'employees.employeeId': employee },
      {
        $set: {
          'employees.$.rate': req.body.rate,
          'employees.$.role': req.body.role,
        },
      },
    );
    return res.status(200).json({
      message: 'Employee has been edited successfully',
      error: false,
    });
  } catch (error) {
    return res.status(400).json({
      message: `${error}`,
      data: undefined,
      error: true,
    });
  }
};

export default {
  createProject,
  getAllProjects,
  getProjectById,
  deleteProject,
  addEmployee,
  updateProject,
  deleteEmployee,
  editEmployee,
};
