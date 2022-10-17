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
    return res.json({
      message: 'An error ocurred',
      error,
    });
  }
};

const getAllTimesheets = async (req, res) => {
  try {
    const timesheets = await Timesheets.find();

    return res.status(200).json({
      message: 'Timesheets found',
      data: timesheets,
      error: false,
    });
  } catch (error) {
    return res.json({
      message: 'An error ocurred',
      error,
    });
  }
};

export default {
  createTimesheet,
  getAllTimesheets,
};
