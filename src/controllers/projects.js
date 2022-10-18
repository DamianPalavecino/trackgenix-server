import Projects from '../models/Projects';

const createProject = async (req, res) => {
  try {
    const project = new Projects({
      employees: req.body.employees,
      name: req.body.name,
      startDate: req.body.startDate,
      endDate: req.body.endDate,
      clientName: req.body.clientName,
      description: req.body.description,
    });
    const result = project.save((error, dataProject) => {
      if (error) {
        return res.status.json({
          message: error,
          data: undefined,
          error: true,
        });
      }
      return res.status(201).json({
        message: 'Project created',
        data: dataProject,
        error: false,
      });
    });
    return result;
  } catch (error) {
    return res.status.json({
      message: `An error ocurred: ${error}`,
      data: undefined,
      error: true,
    });
  }
};

const getAllProjects = async (req, res) => {
  try {
    const projects = await Projects.find();

    if (projects.length <= 0 || projects === null) {
      return res.status(404).json({
        message: 'There are no projects to show',
        data: undefined,
        error: true,
      });
    }

    return res.status(200).json({
      message: 'Project found',
      data: projects,
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

const getProjectById = async (req, res) => {
  try {
    const { id } = req.params;
    const project = await Projects.findById(id);

    return res.status(200).json({
      message: 'Project found',
      data: project,
      error: false,
    });
  } catch (error) {
    return res.status(404).json({
      message: `An error ocurred: ${error}`,
      data: undefined,
      error: true,
    });
  }
};

const deleteProject = async (req, res) => {
  try {
    const { id } = req.params;

    await Projects.deleteOne({ _id: id });

    return res.status(204).json();
  } catch (error) {
    return res.status(404).json({
      message: `An error ocurred: ${error}`,
      data: undefined,
      error: true,
    });
  }
};

const updateProject = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedProject = req.body;

    await Projects.findByIdAndUpdate(id, updatedProject);

    const project = await Projects.findById(id);

    return res.status(200).json({
      message: 'Project is changed',
      data: project,
      error: false,
    });
  } catch (error) {
    return res.status(404).json({
      message: `An error ocurred: ${error}`,
      data: undefined,
      error: true,
    });
  }
};

const addEmployee = async (req, res) => {
  try {
    const { id } = req.params;
    const newEmployee = req.body;
    await Projects.findByIdAndUpdate({ _id: id }, {
      $addToSet: {
        employees: newEmployee,
      },
    });

    const project = await Projects.findById(id);

    return res.status(201).json({
      message: 'Employee is added',
      data: project,
      error: false,
    });
  } catch (error) {
    return res.status(404).json({
      message: `An error ocurred: ${error}`,
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
};
