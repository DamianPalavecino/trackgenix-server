import express from 'express';
import projectsControllers from '../controllers/projects';
import projectsValidations from '../validations/projects';
import checkAuth from '../middlewares/authMiddleware';

const router = express.Router();

router
  .get('/', checkAuth(['ADMIN', 'EMPLOYEE']), projectsControllers.getAllProjects)
  .get('/:id', checkAuth(['ADMIN', 'EMPLOYEE']), projectsControllers.getProjectById)
  .post('/', checkAuth(['ADMIN']), projectsValidations.validateCreation, projectsControllers.createProject)
  .delete('/:id', checkAuth(['ADMIN']), projectsControllers.deleteProject)
  .put('/:id', checkAuth(['ADMIN', 'EMPLOYEE']), projectsValidations.validateEdit, projectsControllers.updateProject)
  .put('/:id/assignEmployee', checkAuth(['ADMIN']), projectsValidations.validatePutEmployee, projectsControllers.addEmployee)
  .put('/:id/removeEmployee/:employee', checkAuth(['ADMIN']), projectsControllers.deleteEmployee);

export default router;
