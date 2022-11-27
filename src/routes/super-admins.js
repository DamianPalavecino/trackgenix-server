import express from 'express';
import superAdminsControlles from '../controllers/super-admins';
import superAdminsValidations from '../validations/super-admins';
import checkAuth from '../middlewares/authMiddleware';

const router = express.Router();

router
  .get('/', checkAuth(['SUPER_ADMIN']), superAdminsControlles.getAllSuperAdmins)
  .get('/:id', checkAuth(['SUPER_ADMIN']), superAdminsControlles.getSuperAdminsById)
  .post('/', checkAuth(['SUPER_ADMIN']), superAdminsValidations.validateCreation, superAdminsControlles.createSuperAdmin)
  .delete('/:id', checkAuth(['SUPER_ADMIN']), superAdminsControlles.deletedSuperAdmin)
  .put('/:id', checkAuth(['SUPER_ADMIN']), superAdminsValidations.validateEdit, superAdminsControlles.editedSuperAdmin);

export default router;
