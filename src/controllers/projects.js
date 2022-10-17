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
        return res.status(400).json({
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
    return res.status(400).json({
      message: 'An error ocurred',
      data: undefined,
      error: true,
    });
  }
};

const getAllProjects = async (req, res) => {
  try {
    const projects = await Projects.find();

    return res.status(200).json({
      message: 'Project found',
      data: projects,
      error: false,
    });
  } catch (error) {
    return res.json({
      message: 'An error ocurred',
      error: true,
    });
  }
};

const getProjectById = async (req, res) => {
  try {
    const { id } = req.params;
    const projects = await Projects.findById(id);

    if (projects == null) {
      return res.status(404).json({
        message: 'Project not found',
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
    return res.json({
      message: `An error ocurred: ${error}`,
      error: true,
      data: undefined,
    });
  }
};

export default {
  createProject,
  getAllProjects,
  getProjectById,
};
