import Employees from '../models/employees';

const deleteEmployee = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await Employees.findByIdAndDelete(id);

    return res.status(200).json({
      message: `Employee with id ${id} deleted`,
      data: result,
      error: false,
    });
  } catch (error) {
    return res.json({
      essage: 'An error occured',
      error,
    });
  }
};

const editEmployee = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await Employees.findByIdAndUpdate(
      { _id: id },
      { ...req.body },
      { new: true },
    );

    return res.status(200).json({
      message: `Employee widh id ${id} edited`,
      data: result,
      error: false,
    });
  } catch (error) {
    return res.json({
      message: 'An error occurred',
      error,
    });
  }
};

export default {
  deleteEmployee,
  editEmployee,
};
