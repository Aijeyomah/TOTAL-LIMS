import { Router } from 'express';
import adminRoute from './admin';
import productResultRoute from './product';

const router = Router();

router.use('/admin', adminRoute);
router.use("/analysis", productResultRoute);

export default router;
