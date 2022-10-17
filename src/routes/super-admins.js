import express from 'express';
import superAdminsControlles from '../controllers/super-admins';
import superAdminsValidations from '../validations/super-admins';

const router = express.Router();

router
  .get('/', superAdminsControlles.getAllSuperAdmins)
  .get('/:id', superAdminsControlles.getSuperAdminsId)
  .post('/', superAdminsValidations.validateCreation, superAdminsControlles.createSuperAdmin);

export default router;
