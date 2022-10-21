import express from 'express';
import timesheetsRoutes from './timesheets';
import employeeRoutes from './employees';
import projectRoutes from './projects';

const router = express.Router();

router
  .use('/timesheets', timesheetsRoutes)
  .use('/employees', employeeRoutes)
  .use('/projects', projectRoutes);

export default router;
