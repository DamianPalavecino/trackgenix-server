import express from 'express';
import checkAuth from '../middlewares/authMiddleware';
import getUserProfile from '../controllers/auth';

const router = express.Router();

router
  .get('/getUserProfile', checkAuth(['SUPER_ADMIN', 'ADMIN', 'EMPLOYEE']), getUserProfile);
export default router;
