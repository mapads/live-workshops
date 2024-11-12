// server/routes/goalRoutes.js
import { Router } from 'express';
const router = Router();
import { createApplication } from '../controllers/applicationController';

router.post('/apply', createApplication);

export default router;