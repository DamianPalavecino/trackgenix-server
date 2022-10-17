import express from 'express';
import timesheetsControllers from '../controllers/timesheets';

const router = express.Router();

router
  .post('/', timesheetsControllers.createTimesheet)
  .get('/', timesheetsControllers.getAllTimesheets)
  .get('/:id', timesheetsControllers.getTimesheetById);

export default router;
