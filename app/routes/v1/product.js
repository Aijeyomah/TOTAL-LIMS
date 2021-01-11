import { Router } from "express";
import { AuthMiddleware, RoleMiddleware } from "../../middleware/auth";
const { validateAnalysisResultFields} = ProductMiddleware;
import { ProductMiddleware } from "../../middleware/products";
import ProductAnalysisResult from '../../controllers/products'

const router = Router();
const { checkIfTestIsValid, checkIfResultDetailExist } = ProductMiddleware;
const { saveAnalysisResult, getAnalysisResult } = ProductAnalysisResult;
const { roleValidator, roleAccessValidator } = RoleMiddleware;
router.post(
    '/result',
    roleAccessValidator(['super', 'staff']),
    validateAnalysisResultFields,
    checkIfTestIsValid,
    saveAnalysisResult,
);

router.get(
    '/result/:productResultId',
    roleValidator,
    checkIfResultDetailExist,
    getAnalysisResult
)

export default router;