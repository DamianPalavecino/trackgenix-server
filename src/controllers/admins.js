import Admins from '../models/Admins';

const { ObjectId } = require('mongoose').Types;

const responseHandler = (res, statusCode, msg, data) => res.status(statusCode).json({
  message: msg,
  data,
  error: statusCode >= 400,
});

const getAllAdmins = async (req, res) => {
  try {
    const allAdmins = await Admins.find();
    const queryParam = Object.keys(req.query);
    const adminFiltered = await Admins.find(req.query);
    const adminKeys = ['name', 'lastName', 'email'];
    let includes = true;

    if (queryParam.length <= 0) {
      if (allAdmins.length <= 0 || allAdmins === null) {
        return responseHandler(res, 404, 'There is no admins to display');
      }
      return responseHandler(res, 200, 'Admins found', allAdmins);
    }

    queryParam.forEach((element) => {
      if (!adminKeys.includes(element)) {
        includes = false;
      }
      return includes;
    });

    if (!includes) {
      return responseHandler(res, 404, 'Parameters are incorrect');
    }

    if (adminFiltered.length > 0) {
      const message = adminFiltered.length === 1 ? 'Admin found' : 'Admin found';
      return responseHandler(res, 200, message, adminFiltered);
    }
    return responseHandler(res, 404, 'Admin not found');
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
      return responseHandler(res, 400, 'Invalid ID');
    }

    const admins = await Admins.findById(id);

    if (!id) {
      return responseHandler(res, 400, 'Missing ID parameter');
    }
    return responseHandler(res, 200, 'Admin found', admins);
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
    return responseHandler(res, 201, 'Admin created successfully', result);
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
      return responseHandler(res, 400, 'No ID parameter');
    }

    if (Object.entries(updatedAdmin).length <= 0) {
      return responseHandler(res, 400, 'Admin must have content');
    }
    if (result === null) {
      return responseHandler(res, 404, 'Admin not found');
    }
    const message = `Admin id  ${id} edited`;
    return responseHandler(res, 201, message, editResult);
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
      return responseHandler(res, 400, 'No ID parameter');
    }

    await Admins.findByIdAndDelete(id);

    if (result === null) {
      return responseHandler(res, 404, 'Admin not found');
    }
    const message = `Admin with id ${id} deleted`;
    return responseHandler(res, 200, message, result);
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
