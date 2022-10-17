import Tasks from '../models/tasks';

const getAllTasks = async (req, res) => {
  try {
    const tasks = await Tasks.find();

    return res.status(200).json({
      message: 'Tasks found',
      data: tasks,
      error: false,
    });
  } catch (error) {
    return res.json({
      message: 'An error occured',
      error: true,
    });
  }
};
const getTaskById = async (req, res) => {
  try {
    const { id } = req.params;
    const tasks = await Tasks.findById(id);
    return res.status(200).json({
      message: 'Task found',
      data: tasks,
      error: false,
    });
  } catch (error) {
    if (error.name === 'CastError') {
      return res.status(404).json({
        message: `No task has '${req.params.id}' as an id`,
        data: undefined,
        error: true,
      });
    }
    return res.json({
      message: error.message,
      data: undefined,
      error: true,
    });
  }
};
const createTask = async (req, res) => {
  try {
    const task = new Tasks({
      description: req.body.description,
    });
    const result = await task.save();
    return res.status(201).json({
      message: 'Task created successfully',
      data: result,
      error: false,
    });
  } catch (error) {
    return res.json({
      message: error.message,
      data: undefined,
      error: true,
    });
  }
};

export default {
  getAllTasks,
  getTaskById,
  createTask,
};
