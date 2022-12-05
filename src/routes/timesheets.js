import express from 'express';
import timesheetsControllers from '../controllers/timesheets';
import timesheetsValidation from '../validations/timesheets';
import checkAuth from '../middlewares/authMiddleware';

const router = express.Router();

router
  .put('/', timesheetsControllers.missingId)
  .delete('/', timesheetsControllers.missingId)
  .post('/', checkAuth(['EMPLOYEE', 'ADMIN']), timesheetsValidation.validateCreation, timesheetsControllers.createTimesheet)
  .get('/', checkAuth(['ADMIN', 'EMPLOYEE']), timesheetsControllers.getAllTimesheets)
  .get('/:id', checkAuth(['ADMIN', 'EMPLOYEE']), timesheetsControllers.getTimesheetById)
  .put('/:id', checkAuth(['EMPLOYEE', 'ADMIN']), timesheetsValidation.validateUpdate, timesheetsControllers.editTimesheetById)
  .delete('/:id', checkAuth(['EMPLOYEE', 'ADMIN']), timesheetsControllers.deleteTimesheetById);

export default router;
