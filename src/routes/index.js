import express from 'express';
import superAdminsRoutes from './super-admins';

const router = express.Router();

router
  .use('/superAdmins', superAdminsRoutes);

export default router;
