import express from 'express';
import employeeRoutes from './employees';
import projectRoutes from './projects';
import adminsRoutes from './admins';

const router = express.Router();

router
  .use('/employees', employeeRoutes)
  .use('/projects', projectRoutes)
  .use('/admins', adminsRoutes);

export default router;
