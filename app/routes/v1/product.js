import { Router } from "express";
import { AuthMiddleware, RoleMiddleware } from "../../middleware/auth";
const { validateAnalysisResultFields} = ProductMiddleware;
import { ProductMiddleware } from "../../middleware/products";
import ProductAnalysisResult from '../../controllers/products'

const router = Router();
const { checkIfTestIsValid } = ProductMiddleware;
const { analysisResult } = ProductAnalysisResult;
const { roleValidator } = RoleMiddleware;
router.post(
    '/result',
    roleValidator,
    validateAnalysisResultFields,
    checkIfTestIsValid,
    analysisResult,
);

export default router;