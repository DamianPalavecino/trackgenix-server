import firebase from '../helpers/firebase';
import SuperAdmins from '../models/Super-admins';

const { ObjectId } = require('mongoose').Types;

const error404 = (res, msg) => res.status(404).json({
  message: msg,
  data: undefined,
  error: true,
});
const error400 = (res, msg) => res.status(400).json({
  message: msg,
  data: undefined,
  error: true,
});

const getAllSuperAdmins = async (req, res) => {
  try {
    const allSuperAdmins = await SuperAdmins.find();
    const params = JSON.parse(JSON.stringify(req.query).toLocaleLowerCase());
    const queryParam = Object.keys(req.query);
    const superAdminFiltered = await SuperAdmins.find(params);
    const superAdminKeys = ['name', 'lastName', 'email'];
    let includes = true;

    if (queryParam.length <= 0) {
      if (allSuperAdmins.length <= 0 || allSuperAdmins === null) {
        return res.status(404).json({
          message: 'There was an error: There are no super super admins to display',
          data: undefined,
          error: true,
        });
      }
      return res.status(200).json({
        message: 'Super Admins found successfully',
        data: allSuperAdmins,
        error: false,
      });
    }

    queryParam.forEach((element) => {
      if (!superAdminKeys.includes(element)) {
        includes = false;
      }
      return includes;
    });

    if (!includes) {
      return res.status(404).json({
        message: 'There was an error: Parameters are incorrect',
        data: undefined,
        error: true,
      });
    }

    if (superAdminFiltered.length > 0) {
      return res.status(200).json({
        message: 'Super Admins found successfully',
        data: superAdminFiltered,
        error: false,
      });
    }
    return res.status(404).json({
      message: 'There was an error: Super Admins were not found',
      data: undefined,
      error: true,
    });
  } catch (error) {
    return res.json({
      message: `There was an error: ${error}`,
      data: undefined,
      error: true,
    });
  }
};

const getSuperAdminsById = async (req, res) => {
  try {
    const { id } = req.params;
    if (!ObjectId.isValid(id)) {
      return res.status(400).json({
        message: `There was an error: ID ${id} is not valid`,
        data: undefined,
        error: true,
      });
    }

    const superAdmins = await SuperAdmins.findById(id);

    if (!id) {
      return res.status(400).json({
        message: 'There was an error: Missing ID parameter',
        data: undefined,
        error: true,
      });
    }
    if (!superAdmins) {
      return res.status(400).json({
        message: `There was an error: Super Admin with ID ${id} was not found`,
        error: true,
      });
    }
    return res.status(200).json({
      message: `Super Admin with ID ${id} found successfully`,
      data: superAdmins,
      error: false,
    });
  } catch (error) {
    return res.status(400).json({
      message: `There was an error: ${error}`,
      error: true,
    });
  }
};

const createSuperAdmin = async (req, res) => {
  try {
    const newFirebaseUser = await firebase.auth().createUser({
      email: req.body.email,
      password: req.body.password,
    });

    await firebase.auth().setCustomUserClaims(newFirebaseUser.uid, { role: 'SUPER_ADMIN' });

    const superAdmin = new SuperAdmins({
      name: req.body.name,
      lastName: req.body.lastName,
      email: req.body.email,
      firebaseUid: newFirebaseUser.uid,
    });

    const result = await superAdmin.save();
    return res.status(201).json({
      message: 'Super Admin created successfully',
      data: result,
      error: false,
    });
  } catch (error) {
    return res.json({
      message: `There was an error: ${error}`,
      error: true,
    });
  }
};

const deletedSuperAdmin = async (req, res) => {
  try {
    const superAdmin = await SuperAdmins.findByIdAndDelete(req.params.id);
    await firebase.auth().deleteUser(superAdmin.firebaseUid);
    if (!superAdmin) {
      throw new Error({
        message: 'SuperAdmin not found',
        status: 404,
      });
    }
    return res.status(204).json({
      data: superAdmin,
      error: false,
    });
  } catch (error) {
    return res.status(404).json({
      message: `There was an error: ${error}`,
      data: undefined,
      error: true,
    });
  }
};

const editedSuperAdmin = async (req, res) => {
  try {
    const { id } = req.params;
    if (!ObjectId.isValid(id)) return error404(res, `There was an error: ID ${id} is not valid`);

    const superAdmin = req.body;

    if (Object.entries(superAdmin).length === 0 || !superAdmin) {
      return error400(res, 'There was an error: The request body was empty');
    }

    if (req.body.email && req.body.password) {
      await firebase.auth().updateUser(superAdmin.firebaseUid, {
        email: req.body.email,
        password: req.body.password,
      });
    }
    const result = await SuperAdmins.findByIdAndUpdate(id, superAdmin, { new: true });

    if (!result) return error404(res, `There was an error: Super Admin with ID ${id} was not found`);

    return res.status(200).json({
      message: `Super Admin with ID ${id} edited successfully`,
      data: result,
      error: false,
    });
  } catch (error) {
    return res.json({
      message: `There was an error: ${error}`,
      data: undefined,
      error: true,
    });
  }
};

export default {
  getAllSuperAdmins,
  getSuperAdminsById,
  createSuperAdmin,
  deletedSuperAdmin,
  editedSuperAdmin,
};
