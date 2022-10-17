import express from 'express';
import timesheetsControllers from '../controllers/timesheets';
import timesheetsValidation from '../validations/timesheets';

const router = express.Router();

router
  .post('/', timesheetsValidation.validateCreation, timesheetsControllers.createTimesheet)
  .get('/', timesheetsControllers.getAllTimesheets)
  .get('/:id', timesheetsControllers.getTimesheetById);

export default router;
