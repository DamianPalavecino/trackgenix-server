import express from 'express';
import adminsControllers from '../controllers/admins';
import checkAuth from '../middlewares/authMiddleware';
import adminsValidations from '../validations/admins';

const router = express.Router();

router
  .put('/:id', checkAuth(['SUPER_ADMIN']), adminsValidations.validateEdition, adminsControllers.editAdmin)
  .delete('/:id', checkAuth(['SUPER_ADMIN']), adminsControllers.deleteAdmin)
  .get('/', checkAuth(['SUPER_ADMIN']), adminsControllers.getAllAdmins)
  .get('/:id', checkAuth(['SUPER_ADMIN']), adminsControllers.getAdminById)
  .post('/', checkAuth(['SUPER_ADMIN']), adminsValidations.validateCreation, adminsControllers.createAdmin);

export default router;
