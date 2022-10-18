import express from 'express';
import adminsControllers from '../controllers/admins';
import adminValidations from '../validations/admins';

const router = express.Router();

router
  .put('/', adminValidations.validateEdition, adminsControllers.editAdmin)
  .delete('/', adminsControllers.deleteAdmin);
export default router;
