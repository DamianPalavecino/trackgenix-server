import Timesheets from '../models/Timesheets';

const createTimesheet = async (req, res) => {
  try {
    const timesheet = new Timesheets({
      description: req.body.description,
      date: req.body.date,
      task: req.body.task,
    });

    const result = await timesheet.save();
    return res.status(201).json({
      message: 'Timesheet created',
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

const getAllTimesheets = async (req, res) => {
  try {
    const timesheets = await Timesheets.find();

    if (timesheets.length <= 0) {
      return res.status(404).json({
        message: 'No timesheets found',
        data: undefined,
        error: true,
      });
    }
    return res.status(200).json({
      message: 'Timesheets found',
      data: timesheets,
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

const getTimesheetById = async (req, res) => {
  try {
    const { id } = req.params;
    const timesheet = await Timesheets.findById(id);

    return res.status(200).json({
      message: 'Timesheet found',
      data: timesheet,
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

const editTimesheetById = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await Timesheets.findByIdAndUpdate(
      { _id: id },
      { ...req.body },
      { new: true },
    );

    return res.status(200).json({
      message: `Project with id ${id} edited.`,
      data: result,
      error: false,
    });
  } catch (error) {
    return res.status(404).json({
      message: `An error occurred ${error}`,
      data: undefined,
      error: true,
    });
  }
};

const deleteTimesheetById = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await Timesheets.findByIdAndDelete(id);

    return res.status(204).json({
      message: `Project with id ${id} deleted.`,
      data: result,
      error: false,
    });
  } catch (error) {
    return res.status(404).json({
      message: `An error occurred ${error}`,
      data: undefined,
      error: true,
    });
  }
};

export default {
  createTimesheet,
  getAllTimesheets,
  getTimesheetById,
  editTimesheetById,
  deleteTimesheetById,
};
