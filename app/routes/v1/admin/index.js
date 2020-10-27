import { Router } from 'express';
import authRoute from './auth';
import productRoute from './product';
import staffRoute from './staff';

const router = Router();

router.use('/auth', authRoute);
router.use('/products', productRoute);
router.use('/staff', staffRoute);


export default router;
