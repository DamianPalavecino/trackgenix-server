import express from 'express';
import timesheetsRoutes from './timesheets';

const router = express.Router();

router
  .use('/timesheets', timesheetsRoutes);

export default router;
