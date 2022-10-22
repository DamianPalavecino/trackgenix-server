import TaskModel from '../models/Tasks';

const responseHandler = (res, statusCode, msg, data) => res.status(statusCode).json({
  message: msg,
  data,
  error: statusCode >= 400,
});
const getAllTasks = async (req, res) => {
  try {
    const tasks = await TaskModel.find();
    if (tasks.length <= 0) {
      return responseHandler(res, 404, 'No tasks found, empty DB.');
    }
    const params = JSON.parse(JSON.stringify(req.query).toLocaleLowerCase());
    params.description = new RegExp(params.description, 'i');
    const keys = Object.keys(params);
    if (keys.length === 0) {
      return responseHandler(res, 200, 'Tasks found.', tasks);
    }
    keys[0] = keys[0].toLowerCase();
    if (keys.length !== 1 || keys[0] !== 'description') {
      return responseHandler(res, 400, 'There is one or more invalid params.');
    }
    const foundTasks = await TaskModel.find(params);
    if (foundTasks.length <= 0) {
      return responseHandler(res, 404, 'Params does not match any task.');
    }
    const message = foundTasks.length > 1 ? 'Tasks found' : 'Task found';
    return responseHandler(res, 200, message, foundTasks);
  } catch (error) {
    const message = `An error occured: ${error.message}`;
    return responseHandler(res, 500, message);
  }
};

const getTaskById = async (req, res) => {
  const { id } = req.params;
  try {
    const task = await TaskModel.findById(id);
    if (!task || task === null) {
      const message = `The following ID: '${req.params.id}' does not match any task.`;
      return responseHandler(res, 404, message);
    }
    return responseHandler(res, 200, 'Task found', task);
  } catch (error) {
    if (!id.match(/^[0-9a-fA-F]{24}$/)) {
      const message = `The following ID: '${req.params.id}'
does not match any task. Invalid format.`;
      return responseHandler(res, 404, message);
    }
    const message = `An error occured: ${error.message}`;
    return responseHandler(res, 500, message);
  }
};
const createTask = async (req, res) => {
  try {
    const task = new TaskModel({
      description: req.body.description,
    });
    const result = await task.save();
    return responseHandler(res, 201, 'Task created successfully.', result);
  } catch (error) {
    const message = `An error occured: ${error.message}`;
    return responseHandler(res, 500, message);
  }
};
const deleteTask = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await TaskModel.findByIdAndDelete(id);
    if (result === null) {
      const message = `The following ID: '${req.params.id}' does not match any task.`;
      return responseHandler(res, 404, message);
    }
    return responseHandler(res, 204, 'Task deleted successfully.', result);
  } catch (error) {
    if (!id.match(/^[0-9a-fA-F]{24}$/)) {
      const message = `The following ID: '${req.params.id}' does not match any task.`;
      responseHandler(res, 404, message);
    }
    const message = `An error occured: ${error.message}`;
    return responseHandler(res, 500, message);
  }
};
const editTask = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await TaskModel.findByIdAndUpdate(
      { _id: id },
      { ...req.body },
      { new: true },
    );
    const message = `The following ID: '${req.params.id}' does not match any task.`;
    if (!result) return responseHandler(res, 404, message);
    return responseHandler(res, 201, 'Task edited successfully.', result);
  } catch (error) {
    if (!id.match(/^[0-9a-fA-F]{24}$/)) {
      const message = `The following ID: '${req.params.id}' does not match any task.`;
      return responseHandler(res, 404, message);
    }
    const message = `An error occured: ${error.message}`;
    return responseHandler(res, 500, message);
  }
};
export default {
  getAllTasks,
  getTaskById,
  createTask,
  deleteTask,
  editTask,
};
