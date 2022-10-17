import Admins from '../models/Admins';

const getAllAdmins = async (req, res) => {
  try {
    const admins = await Admins.find();

    if (admins.length === 0) {
      return res.status(404).json({
        message: 'There is no data to display',
        data: undefined,
        error: true,
      });
    }

    return res.status(200).json({
      message: 'Admins Found',
      data: admins,
      error: false,
    });
  } catch (error) {
    return res.status(400).json({
      message: 'An error occurried',
      error: true,
    });
  }
};

const getAdminById = async (req, res) => {
  try {
    const { id } = req.params;
    const admins = await Admins.findById(id);

    return res.status(200).json({
      message: 'Admin found',
      data: admins,
      error: false,
    });
  } catch (error) {
    return res.status(404).json({
      message: `Admin not find ${error}`,
      error: true,
    });
  }
};

const createAdmin = async (req, res) => {
  try {
    const admin = new Admins({
      name: req.body.name,
      lastName: req.body.lastName,
      email: req.body.email,
      password: req.body.password,
    });

    const result = await admin.save();
    return res.status(201).json({
      message: 'Admin created successfully',
      data: result,
      error: false,
    });
  } catch (error) {
    return res.status(400).json({
      message: 'An error occurried, Admin not created',
      error: true,
    });
  }
};

export default {
  getAllAdmins,
  getAdminById,
  createAdmin,
};
