import { Router } from 'express';
import adminRoute from './admin';

const router = Router();

router.use('/admin', adminRoute);

export default router;
