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
    const task = await Tasks.findById(id);
    return res.status(200).json({
      message: 'Task found',
      data: task,
      error: false,
    });
  } catch (error) {
    return res.status(404).json({
      message: `No task has '${req.params.id}' as an id`,
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
const deleteTask = async (req, res) => {
  try {
    const { id } = req.params;
    await Tasks.findByIdAndDelete(id);
    return res.status(204).json();
  } catch (error) {
    return res.status(404).json({
      message: `No task has '${req.params.id}' as an id`,
      data: undefined,
      error: true,
    });
  }
};
const editTask = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedTask = req.body;
    await Tasks.findByIdAndUpdate(id, updatedTask);
    const result = await Tasks.findById(id);
    return res.status(200).json({
      message: 'Task edited successfully',
      data: result,
      error: false,
    });
  } catch (error) {
    return res.status(404).json({
      message: `No task has '${req.params.id}' as an id`,
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
