import express from 'express';
import { getAdminMe } from '../controllers/adminController.js';

const router = express.Router();

router.get('/me', getAdminMe);

export default router;