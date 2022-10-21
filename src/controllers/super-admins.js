import SuperAdmins from '../models/Super-admins';

const { ObjectId } = require('mongoose').Types;

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
          message: 'There are no super super admins to display',
          data: undefined,
          error: true,
        });
      }
      return res.status(200).json({
        message: 'Super admins found',
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
        message: 'Parameters are incorrect',
        data: undefined,
        error: true,
      });
    }

    if (superAdminFiltered.length > 0) {
      return res.status(200).json({
        message: superAdminFiltered.length === 1 ? 'Super admin found' : 'Super admin found',
        data: superAdminFiltered,
        error: false,
      });
    }
    return res.status(404).json({
      message: 'Super admin not found',
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

const getSuperAdminsById = async (req, res) => {
  try {
    const { id } = req.params;
    if (!ObjectId.isValid(id)) {
      return res.status(400).json({
        message: 'Invail ID',
        data: undefined,
        error: true,
      });
    }

    const superAdmins = await SuperAdmins.findById(id);

    if (!id) {
      return res.status(400).json({
        message: 'Missing id parameter',
        data: undefined,
        error: true,
      });
    }
    return res.status(200).json({
      message: 'Super Admin found',
      data: superAdmins,
      error: false,
    });
  } catch (error) {
    return res.json({
      message: `An error ocurred: ${error}`,
      error: true,
    });
  }
};

const createSuperAdmin = async (req, res) => {
  try {
    const superAdmin = new SuperAdmins({
      name: req.body.name,
      lastName: req.body.lastName,
      email: req.body.email,
      password: req.body.password,
    });

    const result = await superAdmin.save();
    return res.status(201).json({
      message: 'Super admin created successfully',
      data: result,
      error: false,
    });
  } catch (error) {
    return res.json({
      message: 'An error occurred, super admin not created',
      error: true,
    });
  }
};

const deletedSuperAdmin = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await SuperAdmins.findByIdAndDelete(id);
    if (id === null) {
      return res.status(400).json({
        message: 'No id parameter',
        data: undefined,
        error: true,
      });
    }
    await SuperAdmins.findByIdAndDelete(id);
    if (result === null) {
      return res.status(404).json({
        message: 'Super admin not found',
        data: undefined,
        error: true,
      });
    }
    return res.status(200).json({
      message: `Super admin with id ${id} deleted`,
      data: result,
      error: false,
    });
  } catch (error) {
    return res.status(404).json({
      message: `No super admin with '${req.params.id}' as an id`,
      data: undefined,
      error: true,
    });
  }
};

const editedSuperAdmin = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedSuperAdmin = req.body;
    if (id === null) {
      return res.status(400).json({
        message: 'No id parameter',
        data: undefined,
        error: true,
      });
    }

    if (Object.entries(updatedSuperAdmin).length <= 0) {
      return res.status(400).json({
        message: 'Super Admit must not be empty',
        data: undefined,
        error: true,
      });
    }
    await SuperAdmins.findByIdAndUpdate(id, updatedSuperAdmin);
    const result = await SuperAdmins.findById(id);
    return res.status(201).json({
      message: `Super admin id  ${id} edited`,
      data: result,
      error: false,
    });
  } catch (error) {
    return res.status(404).json({
      message: `No super admin with '${req.params.id}' as an id`,
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
