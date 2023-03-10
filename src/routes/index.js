import express from 'express';
import superAdminsRoutes from './super-admins';
import timesheetsRoutes from './timesheets';
import employeeRoutes from './employees';
import projectRoutes from './projects';
import adminsRoutes from './admins';
import tasksRoutes from './tasks';
import authRoutes from './auth';

const router = express.Router();

router
  .use('/superAdmins', superAdminsRoutes)
  .use('/timesheets', timesheetsRoutes)
  .use('/employees', employeeRoutes)
  .use('/projects', projectRoutes)
  .use('/admins', adminsRoutes)
  .use('/tasks', tasksRoutes)
  .use('/auth', authRoutes);

export default router;
