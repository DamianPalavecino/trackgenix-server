import Projects from '../models/Projects';

const missingId = (res) => res.status(400).json({
  message: 'Missing id parameter',
  data: undefined,
  error: true,
});

const error400 = (res, msg) => res.status(400).json({
  message: msg,
  data: undefined,
  error: true,
});

const error404 = (res, msg) => res.status(404).json({
  message: msg,
  data: undefined,
  error: true,
});

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
    const projectsAll = await Projects.find();
    const queryParams = Object.keys(req.query);
    const find = await Projects.find(req.query);
    const keysProjects = ['name', 'employees', 'startDate', 'endDate', 'description', 'clientName'];
    let includes = true;

    if (queryParams.length < 0) {
      if (projectsAll.length <= 0 || projectsAll === null) {
        return error404(res, 'There are no projects to show');
      }
      return res.status(200).json({
        message: 'Projects found',
        data: projectsAll,
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
      return error400(res, 'Parameters are incorrect');
    }
    if (find.length > 0) {
      return res.status(200).json({
        message: 'Project found',
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

    if (!id) {
      return missingId(res);
    }

    const project = await Projects.findById(id);

    if (!project) {
      return error404(res, 'Project by id not found');
    }

    return res.status(200).json({
      message: 'Project found',
      data: project,
      error: false,
    });
  } catch (error) {
    return res.status.json({
      message: `An error ocurred: ${error}`,
      data: undefined,
      error: true,
    });
  }
};

const deleteProject = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id) {
      return missingId(res);
    }

    const findById = await Projects.findById(id);

    if (!findById) {
      return error404(res, 'Project not exist');
    }

    await Projects.deleteOne({ _id: id });
    return res.status(204).json();
  } catch (error) {
    return error404(res, `An error ocurred: ${error}`);
  }
};

const updateProject = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedProject = req.body;

    if (!id) {
      return missingId(res);
    }

    if (Object.entries(updatedProject).length === 0 || !updatedProject) {
      return error400(res, 'Edited project is empty');
    }
    const project = await Projects.findById(id);
    const result = await Projects.findByIdAndUpdate(id, updatedProject, { new: true });

    if (!project) {
      return error400(res, 'Project does not exist');
    }

    return res.status(200).json({
      message: 'Project is changed',
      data: result,
      error: false,
    });
  } catch (error) {
    return error404(res, `An error ocurred: ${error}`);
  }
};

const addEmployee = async (req, res) => {
  try {
    const { id } = req.params;
    const newEmployee = req.body;

    if (!id) {
      return missingId(res);
    }

    const project = await Projects.findById(id);
    const addEmployeedProject = await Projects.findByIdAndUpdate(
      { _id: id },
      {
        $addToSet: {
          employees: newEmployee,
        },
      },
      { new: true },
    );

    if (!project) {
      return error400(res, 'Project does not exist');
    }

    return res.status(201).json({
      message: 'Employee is added',
      data: addEmployeedProject,
      error: false,
    });
  } catch (error) {
    return res.json({
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
