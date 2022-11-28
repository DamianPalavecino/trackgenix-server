import Admins from '../models/Admins';
import firebase from '../helpers/firebase';

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
        return responseHandler(res, 404, 'There was an error: There are no admins to display');
      }
      return responseHandler(res, 200, 'Admins found successfully', allAdmins);
    }

    queryParam.forEach((element) => {
      if (!adminKeys.includes(element)) {
        includes = false;
      }
      return includes;
    });

    if (!includes) {
      return responseHandler(res, 404, 'There was an error: Parameters are incorrect');
    }

    if (adminFiltered.length > 0) {
      const message = adminFiltered.length === 1 ? 'Admin found successfully' : 'Admins found successfully';
      return responseHandler(res, 200, message, adminFiltered);
    }
    return responseHandler(res, 404, 'There was an error: Admin not found');
  } catch (error) {
    return res.json({
      message: `There was an error: ${error}`,
      data: undefined,
      error: true,
    });
  }
};

const getAdminById = async (req, res) => {
  try {
    const { id } = req.params;
    if (!ObjectId.isValid(id)) {
      return responseHandler(res, 400, `There was an error: ID ${id} is not valid`);
    }

    const admins = await Admins.findById(id);

    if (!id) {
      return responseHandler(res, 400, 'There was an error: ID param is empty');
    }
    return responseHandler(res, 200, 'Admin found successfully', admins);
  } catch (error) {
    return res.json({
      message: `There was an error: ${error}`,
      error: true,
    });
  }
};

const createAdmin = async (req, res) => {
  try {
    const newFirebaseUser = await firebase.auth().createUser({
      email: req.body.email,
      password: req.body.password,
    });

    await firebase.auth().setCustomUserClaims(newFirebaseUser.uid, { role: 'ADMIN' });
    const admin = new Admins({
      name: req.body.name,
      lastName: req.body.lastName,
      email: req.body.email,
      status: false,
      firebaseUid: newFirebaseUser.uid,
    });

    const result = await admin.save();
    return responseHandler(res, 201, 'Admin created successfully', result);
  } catch (error) {
    return res.json({
      message: `There was an error: ${error}`,
      error: true,
    });
  }
};

const editAdmin = async (req, res) => {
  try {
    const { id } = req.params;
    if (!ObjectId.isValid(id)) {
      return res.status(400).json({
        message: `ID ${id} is not valid`,
        data: undefined,
        error: true,
      });
    }
    if (Object.entries(req.body).length === 0) {
      return res.status(400).json({
        message: 'You must edit at least one field',
        data: undefined,
        error: true,
      });
    }

    const admin = await Admins.findById(id);
    if (!admin) {
      return res.status(404).json({
        message: `There was an error: Admin with ID ${id} was not found`,
        data: undefined,
        error: true,
      });
    }

    if (req.body.email && req.body.password) {
      await firebase.auth().updateUser(admin.firebaseUid, {
        email: req.body.email,
        password: req.body.password,
      });
    }
    const result = await Admins.findByIdAndUpdate(
      { _id: id },
      { ...req.body },
      { new: true },
    );

    return res.status(200).json({
      message: `Admin with ID: ${id} was edited successfully`,
      data: result,
      error: false,
    });
  } catch (error) {
    return res.status(400).json({
      message: `There was an error: ${error}`,
      data: undefined,
      error: true,
    });
  }
};

const deleteAdmin = async (req, res) => {
  try {
    const { id } = req.params;

    if (id === null) {
      return responseHandler(res, 400, 'There was an error: ID param is empty');
    }

    const admin = await Admins.findById(id);
    await firebase.auth().deleteUser(admin.firebaseUid);
    const result = await Admins.findByIdAndDelete(id);

    if (result === null) {
      return responseHandler(res, 404, `There was an error: Admin with ${id} was not found`);
    }
    const message = `Admin with ID ${id} deleted`;
    return responseHandler(res, 204, message, result);
  } catch (error) {
    return res.status(400).json({
      message: `There was an error: ${error}`,
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
