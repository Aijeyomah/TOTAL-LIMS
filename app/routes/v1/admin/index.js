import { Router } from 'express';
import authRoute from './auth';
import productRoute from './product';
import staffRoute from './staff';
import { AuthMiddleware} from "../../../middleware/auth";


const router = Router();

const { authenticate } = AuthMiddleware;

router.use('/auth', authRoute);
router.use("/staffs", staffRoute);
router.use('/products',authenticate, productRoute);



export default router;
