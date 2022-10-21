import express from 'express';
import projectRoutes from './projects';
import adminsRoutes from './admins';

const router = express.Router();

router
  .use('/projects', projectRoutes)
  .use('/admins', adminsRoutes);

export default router;
