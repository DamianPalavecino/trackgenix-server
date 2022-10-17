import express from 'express';
import tasksControllers from '../controllers/tasks';
import tasksValidations from '../validations/tasks';

const router = express.Router();

router
  .get('/', tasksControllers.getAllTasks)
  .get('/:id', tasksControllers.getTaskById)
  .post('/', tasksValidations.validateCreation, tasksControllers.createTask)
  .delete('/:id', tasksControllers.deleteTask)
  .put('/:id', tasksValidations.validateEdition, tasksControllers.editTask);

export default router;
