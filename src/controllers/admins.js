import Admins from '../models/Admins';

const { ObjectId } = require('mongoose').Types;

const getAllAdmins = async (req, res) => {
  try {
    const allAdmins = await Admins.find();
    const queryParam = Object.keys(req.query);
    const adminFiltered = await Admins.find(req.query);
    const adminKeys = ['name', 'lastName', 'email'];
    let includes = true;

    if (queryParam.length <= 0) {
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

    queryParam.forEach((element) => {
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
    return res.json({
      message: `An error ocurred: ${error}`,
      data: undefined,
      error: true,
    });
  }
};

const getAdminById = async (req, res) => {
  try {
    const { id } = req.params;
    if (!ObjectId.isValid(id)) {
      return res.status(400).json({
        message: 'Invail ID',
        data: undefined,
        error: true,
      });
    }

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
    return res.json({
      message: `An error ocurred: ${error}`,
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
    return res.json({
      message: 'An error occurred, Admin not created',
      error: true,
    });
  }
};

const editAdmin = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedAdmin = req.body;
    const editResult = await Admins.findByIdAndUpdate(
      { _id: id },
      { ...updatedAdmin },
      { new: true },
    );
    const result = await Admins.findById(id);

    if (id === null) {
      return res.status(400).json({
        message: 'No id parameter',
        data: undefined,
        error: true,
      });
    }

    if (Object.entries(updatedAdmin).length <= 0) {
      return res.status(400).json({
        message: 'Admin must have content',
        data: undefined,
        error: true,
      });
    }
    if (result === null) {
      return res.status(404).json({
        message: 'Admin not found',
        data: undefined,
        error: true,
      });
    }
    return res.status(201).json({
      message: `Admin id  ${id} edited`,
      data: editResult,
      error: false,
    });
  } catch (error) {
    return res.json({
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
  getAllAdmins,
  getAdminById,
  createAdmin,
  editAdmin,
  deleteAdmin,
};
