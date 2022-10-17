import express from 'express';
import tasksControllers from '../controllers/tasks';
import tasksValidations from '../validations/tasks';

const router = express.Router();

router
  .get('/', tasksControllers.getAllTasks)
  .get('/:id', tasksControllers.getTaskById)
  .post('/', tasksValidations.validateCreation, tasksControllers.createTask);

export default router;
