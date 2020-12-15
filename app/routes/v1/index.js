import { Router } from 'express';
import adminRoute from './admin';
import productResultRoute from './product';
import { AuthMiddleware } from "../../middleware/auth";

const router = Router();
const { authenticate } = AuthMiddleware;
router.use('/admin', adminRoute);
router.use("/analysis", authenticate, productResultRoute);

export default router;
