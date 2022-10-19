import Employees from '../models/employees';

const deleteEmployee = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await Employees.findByIdAndDelete(id);
    if (result === null) {
      return res.status(404).json({
        message: 'Employee not found',
        data: undefined,
        error: true,
      });
    }
    return res.status(200).json({
      message: `Employee with id ${id} deleted`,
      data: result,
      error: false,
    });
  } catch (error) {
    return res.json({
      message: `Server error: ${error}`,
      error: true,
    });
  }
};

const editEmployee = async (req, res) => {
  try {
    const { id } = req.params;
    if (Object.entries(req.body).length === 0) {
      return res.status(400).json({
        message: 'You must edit at least one field',
        data: undefined,
        error: true,
      });
    }
    const result = await Employees.findByIdAndUpdate(
      { _id: id },
      { ...req.body },
      { new: true },
    );
    if (result === null) {
      return res.status(404).json({
        message: 'Employee not found',
        data: undefined,
        error: true,
      });
    }
    return res.status(200).json({
      message: `Employee widh id ${id} edited`,
      data: result,
      error: false,
    });
  } catch (error) {
    return res.json({
      message: `Server error: ${error}`,
      data: undefined,
      error: true,
    });
  }
};

export default {
  deleteEmployee,
  editEmployee,
};
