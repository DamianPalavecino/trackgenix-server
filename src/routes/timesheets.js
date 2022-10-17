import express from 'express';
import timesheetsControllers from '../controllers/timesheets';

const router = express.Router();

router
  .post('/', timesheetsControllers.createTimesheet);

export default router;
