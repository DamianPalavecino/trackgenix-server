import TaskModel from '../models/tasks';

const getAllTasks = async (req, res) => {
  try {
    const tasks = await TaskModel.find();
    const params = req.query;
    const keys = Object.keys(params);
    if (tasks.length <= 0) {
      return res.status(404).json({
        message: 'No tasks found, empty DB.',
        data: undefined,
        error: false,
      });
    }
    if (keys.length > 0) {
      const foundTask = await TaskModel.find(params);
      const findInvalidKeys = keys.filter((key) => key !== 'description');
      if (findInvalidKeys.length > 0) {
        return res.status(400).json({
          message: 'Invalid params.',
          data: undefined,
          error: true,
        });
      }
      if (foundTask.length <= 0) {
        return res.status(404).json({
          message: 'Params does not match any task.',
          data: undefined,
          error: true,
        });
      }
      if (foundTask.length > 1) {
        return res.status(200).json({
          message: 'Tasks found',
          data: foundTask,
          error: false,
        });
      }
      return res.status(200).json({
        message: 'Task found',
        data: foundTask,
        error: false,
      });
    }
    return res.status(200).json({
      message: 'Tasks found.',
      data: tasks,
      error: false,
    });
  } catch (error) {
    return res.status(500).json({
      message: `An error occured: ${error.message}`,
      data: undefined,
      error: true,
    });
  }
};

const getTaskById = async (req, res) => {
  try {
    const { id } = req.params;
    const task = await TaskModel.findById(id);
    if (task === null) {
      return res.status(404).json({
        message: `The following ID: '${req.params.id}' exist but was deleted.`,
        data: undefined,
        error: false,
      });
    }
    return res.status(200).json({
      message: 'Task found.',
      data: task,
      error: false,
    });
  } catch (error) {
    if (error.name === 'CastError') {
      return res.status(404).json({
        message: `The following ID: '${req.params.id}' does not match any task.`,
        data: undefined,
        error: false,
      });
    }
    return res.status(500).json({
      message: `An error occured: ${error.message}`,
      data: undefined,
      error: true,
    });
  }
};
const createTask = async (req, res) => {
  try {
    const task = new TaskModel({
      description: req.body.description,
    });
    const result = await task.save();
    return res.status(201).json({
      message: 'Task created successfully.',
      data: result,
      error: false,
    });
  } catch (error) {
    return res.status(500).json({
      message: `An error occured: ${error.message}`,
      data: undefined,
      error: true,
    });
  }
};
const deleteTask = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await TaskModel.findByIdAndDelete(id);
    return res.status(204).json({
      message: 'Task deleted successfully.',
      data: result,
      error: false,
    });
  } catch (error) {
    if (error.name === 'CastError') {
      return res.status(404).json({
        message: `The following ID: '${req.params.id}' does not match any task.`,
        data: undefined,
        error: false,
      });
    }
    return res.status(500).json({
      message: `An error occured: ${error.message}`,
      data: undefined,
      error: true,
    });
  }
};
const editTask = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await TaskModel.findByIdAndUpdate(
      { _id: id },
      { ...req.body },
      { new: true },
    );
    return res.status(201).json({
      message: 'Task edited successfully.',
      data: result,
      error: false,
    });
  } catch (error) {
    if (error.name === 'CastError') {
      return res.status(404).json({
        message: `The following ID: '${req.params.id}' does not match any task.`,
        data: undefined,
        error: false,
      });
    }
    return res.status(500).json({
      message: `An error occured: ${error.message}`,
      data: undefined,
      error: true,
    });
  }
};
export default {
  getAllTasks,
  getTaskById,
  createTask,
  deleteTask,
  editTask,
};
