import express from 'express';
import adminsControllers from '../controllers/admins';

const router = express.Router();

router
  .put('/', adminsControllers.editAdmin);

export default router;
