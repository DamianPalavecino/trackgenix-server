import express from 'express';
import employeeControllers from '../controllers/employees';
import validateEdition from '../validations/employees';

const router = express.Router();

router
  .put('/:id', validateEdition, employeeControllers.editEmployee)
  .delete('/:id', employeeControllers.deleteEmployee);

export default router;
