import express from 'express';
import tasksControllers from '../controllers/tasks';
import tasksValidations from '../validations/tasks';
import checkAuth from '../middlewares/authMiddleware';

const router = express.Router();

router
  .get('/', checkAuth(['ADMIN', 'EMPLOYEE']), tasksControllers.getAllTasks)
  .get('/:id', checkAuth(['ADMIN', 'EMPLOYEE']), tasksControllers.getTaskById)
  .post('/', checkAuth(['ADMIN']), tasksValidations.validateTask, tasksControllers.createTask)
  .delete('/:id', checkAuth(['ADMIN']), tasksControllers.deleteTask)
  .put('/:id', checkAuth(['ADMIN']), tasksValidations.validateTask, tasksControllers.editTask);

export default router;
