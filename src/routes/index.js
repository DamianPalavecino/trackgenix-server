import express from 'express';
import employeeRoutes from './employees';
import projectRoutes from './projects';

const router = express.Router();

router
  .use('/employees', employeeRoutes)
  .use('/projects', projectRoutes);

export default router;
