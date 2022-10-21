import express from 'express';
import timesheetsRoutes from './timesheets';
import projectRoutes from './projects';

const router = express.Router();

router
  .use('/timesheets', timesheetsRoutes)
  .use('/projects', projectRoutes);

export default router;
