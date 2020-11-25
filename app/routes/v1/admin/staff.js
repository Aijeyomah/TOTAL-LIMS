import { Router } from "express";
import AuthController from "../../../controllers/admin/auth";
import { AuthMiddleware, RoleMiddleware } from "../../../middleware/auth";

const { authenticate } = AuthMiddleware;
const { roleValidator } = RoleMiddleware;
const router = Router();

//router.use("/", );
const { fetchAllStaff } = AuthController;

router.get("/staff", authenticate, roleValidator,fetchAllStaff);

export default router;