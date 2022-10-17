import Admins from '../models/Admins';

const getAllAdmins = async (req, res) => {
  try {
    const admins = await Admins.find();

    if (admins.length === 0) {
      return res.status(404).json({
        message: 'Admin not exist',
        error: true,
      });
    }

    return res.status(200).json({
      message: 'Admin Found',
      data: admins,
      error: false,
    });
  } catch (error) {
    return res.status(400).json({
      message: 'Error',
      error: true,
    });
  }
};

export default {
  getAllAdmins,
};
