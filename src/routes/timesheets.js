import express from 'express';
import timesheetsControllers from '../controllers/timesheets';
import timesheetsValidation from '../validations/timesheets';

const router = express.Router();

router
  .post('/', timesheetsValidation.validateCreationAndUpdate, timesheetsControllers.createTimesheet)
  .get('/', timesheetsControllers.getAllTimesheets)
  .get('/:id', timesheetsControllers.getTimesheetById)
  .put('/:id', timesheetsValidation.validateCreationAndUpdate, timesheetsControllers.editTimesheetById)
  .delete('/:id', timesheetsControllers.deleteTimesheetById);

export default router;
