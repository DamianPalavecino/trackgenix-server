import Admins from '../models/admins';

const editAdmin = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedAdmin = req.body;

    if (id === null) {
      return res.status(400).json({
        message: 'no id parameter',
        data: undefined,
        error: true,
      });
    }

    if (Object.entries(editAdmin).length === 0) {
      return res.status(400).json({
        message: 'Edited admin is empty',
        data: undefined,
        error: true,
      });
    }

    await Admins.findByIdAndUpdate(id, updatedAdmin);
    const result = await Admins.findById(id);

    return res.status(201).json({
      message: `Admin id  ${id} edited`,
      data: result,
      error: false,
    });
  } catch (error) {
    return res.status(404).json({
      message: `No admin with '${req.params.id}' as an id`,
      data: undefined,
      error: true,
    });
  }
};

const deleteAdmin = async (req, res) => {
  try {
    const { id } = req.params;

    await Admins.findByIdAndDelete(id);

    return res.status(204).json();
  } catch (error) {
    return res.status(404).json({
      message: `No admin with '${req.params.id}' as an id`,
      data: undefined,
      error: true,
    });
  }
};

export default {
  editAdmin,
  deleteAdmin,
};
