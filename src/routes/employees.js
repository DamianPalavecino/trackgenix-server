import express from 'express';
import employeeControllers from '../controllers/employees';
import checkAuth from '../middlewares/authMiddleware';
import employeeValidations from '../validations/employees';

const router = express.Router();

router
  .put('/:id', checkAuth(['ADMIN']), employeeValidations.validateEdition, employeeControllers.editEmployee)
  .delete('/:id', checkAuth(['ADMIN']), employeeControllers.deleteEmployee)
  .get('/', checkAuth(['ADMIN']), employeeControllers.getAllEmployees)
  .get('/:id', checkAuth(['ADMIN']), employeeControllers.getEmployeeById)
  .post('/', checkAuth(['ADMIN']), employeeValidations.validateCreation, employeeControllers.createEmployee);

export default router;
