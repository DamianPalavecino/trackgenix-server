import express from 'express';
import adminsControllers from '../controllers/admins';
import adminValidations from '../validations/admins';

const router = express.Router();

router
  .put('/:id', adminValidations.validateEdition, adminsControllers.editAdmin)
  .delete('/:id', adminsControllers.deleteAdmin);
export default router;
