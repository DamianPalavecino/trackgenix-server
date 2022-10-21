// import SuperAdmins from '../models/super-admins';

// const getAllSuperAdmins = async (req, res) => {
//   try {
//     const superAdmin = await SuperAdmins.find();

//     return res.status(200).json({
//       message: 'Super admin found',
//       data: superAdmin,
//       error: false,
//     });
//   } catch (error) {
//     return res.json({
//       message: 'An error occurred',
//       error,
//     });
//   }
// };

// const getSuperAdminsId = async (req, res) => {
//   try {
//     const { id } = req.params;
//     const superAdmin = await SuperAdmins.findById(id);
//     if (!superAdmin) {
//       return res.status(404).json({
//         meesage: 'Super admin dont exist',
//         error: true,
//       });
//     }

//     return res.status(200).json({
//       message: 'Super admin found',
//       data: superAdmin,
//       error: false,
//     });
//   } catch (error) {
//     return res.json({
//       message: 'An error occurred',
//       error,
//     });
//   }
// };

// const createSuperAdmin = async (req, res) => {
//   try {
//     const superAdmin = new SuperAdmins({
//       name: req.body.name,
//       lastName: req.body.lastName,
//       email: req.body.email,
//       password: req.body.password,
//     });

//     const result = await superAdmin.save();
//     return res.status(201).json({
//       message: 'Super admin created successfully',
//       data: result,
//       error: false,
//     });
//   } catch (error) {
//     return res.status(400).json({
//       message: 'An error occurred',
//       error,
//     });
//   }
// };

// const deletedSuperAdmin = async (req, res) => {
//   try {
//     const { id } = req.params;
//     const result = await SuperAdmins.findByIdAndDelete(id);

//     return res.status(204).json({
//       message: `Project with id ${id} deleted.`,
//       data: result,
//       error: false,
//     });
//   } catch (error) {
//     return res.json({
//       message: 'An error occurred',
//       error,
//     });
//   }
// };

// const editedSuperAdmin = async (req, res) => {
//   try {
//     const { id } = req.params;
//     const result = await SuperAdmins.findByIdAndUpdate(
//       { _id: id },
//       { ...req.body },
//       { new: true },
//     );

//     return res.status(201).json({
//       message: `Project with id${id} edited.`,
//       data: result,
//       error: false,
//     });
//   } catch (error) {
//     return res.json({
//       message: 'An error occurred.',
//       error,
//     });
//   }
// };

// export default {
//   getAllSuperAdmins,
//   getSuperAdminsId,
//   createSuperAdmin,
//   deletedSuperAdmin,
//   editedSuperAdmin,
// };
