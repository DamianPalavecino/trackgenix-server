import { object } from 'joi';
import Admins from '../models/Admins';

const editAdmin = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedAdmin = req.body;

    if (id === null) {
      return res.status(400).json({
        message: 'No id parameter',
        data: undefined,
        error: true,
      });
    }

    if (object.entries(updatedAdmin).length <= 0) {
      return res.status(400).json({
        message: 'Admin must have content',
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
    const result = await Admins.findByIdAndDelete(id);

    if (id === null) {
      return res.status(400).json({
        message: 'no id parameter',
        data: undefined,
        error: true,
      });
    }

    await Admins.findByIdAndDelete(id);

    if (result === null) {
      return res.status(404).json({
        message: 'Admin not found',
        data: undefined,
        error: true,
      });
    }

    return res.status(200).json({
      message: `Admin with id ${id} deleted`,
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

export default {
  editAdmin,
  deleteAdmin,
};
