import Admins from '../models/Admins';

const getAllAdmins = async (req, res) => {
  try {
    const allAdmins = await Admins.find();
    const queryParams = Object.keys(req.query);
    const adminFiltered = await Admins.find(req.query);
    const adminKeys = ['name', 'lastName', 'email'];
    let includes = true;

    if (queryParams.length <= 0) {
      if (allAdmins.length <= 0 || allAdmins === null) {
        return res.status(404).json({
          message: 'There is no admins to display',
          data: undefined,
          error: true,
        });
      }
      return res.status(200).json({
        message: 'Admins found',
        data: allAdmins,
        error: false,
      });
    }

    queryParams.forEach((element) => {
      if (!adminKeys.includes(element)) {
        includes = false;
      }
      return includes;
    });

    if (!includes) {
      return res.status(404).json({
        message: 'Parameters are incorrect',
        data: undefined,
        error: true,
      });
    }

    if (adminFiltered.length > 0) {
      return res.status(200).json({
        message: adminFiltered.length === 1 ? 'Admin found' : 'Admin found',
        data: adminFiltered,
        error: false,
      });
    }
    return res.status(404).json({
      message: 'Admin not found',
      data: undefined,
      error: true,
    });
  } catch (error) {
    return res.status(400).json({
      message: `An error ocurred: ${error}`,
      data: undefined,
      error: true,
    });
  }
};

const getAdminById = async (req, res) => {
  try {
    const { id } = req.params;
    const admins = await Admins.findById(id);

    if (!id) {
      return res.status(400).json({
        message: 'Missing id parameter',
        data: undefined,
        error: true,
      });
    }
    return res.status(200).json({
      message: 'Admin found',
      data: admins,
      error: false,
    });
  } catch (error) {
    return res.status(404).json({
      message: `Admin not found ${error}`,
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
