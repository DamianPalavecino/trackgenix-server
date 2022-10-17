import express from 'express';
import employeeControllers from '../controllers/employees';

const router = express.Router();

router
  .put('/:id', employeeControllers.editEmployee)
  .delete('/:id', employeeControllers.deleteEmployee);

export default router;
