import { Router } from "express";
import { AuthMiddleware, RoleMiddleware } from "../../middleware/auth";
import { ProductMiddleware } from "../../middleware/products";
import ProductAnalysisResult from '../../controllers/products'

const router = Router();
const { analysisResult } = ProductAnalysisResult;
const { roleValidator } = RoleMiddleware;
router.post(
    '/result',
    roleValidator,
    analysisResult,
);

export default router;