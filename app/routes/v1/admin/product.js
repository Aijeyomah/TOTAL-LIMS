import { Router } from "express";
import BlendProductController from "../../../controllers/admin/products/blend.product";
import { AuthMiddleware, RoleMiddleware } from "../../../middleware/auth";
import { BlendProductMiddleware } from "../../../middleware/products";

const router = Router();
const { authenticate } = AuthMiddleware;
const { roleValidator } = RoleMiddleware;
const { blendProduct } = BlendProductController;
const { checkIfProductExist } = BlendProductMiddleware;

router.post("/blend", authenticate, roleValidator, checkIfProductExist, blendProduct);

export default router;
