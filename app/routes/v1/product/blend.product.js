import { Router } from "express";
import ProductController from "../../../controllers/admin/products/blend.product";
import BlendProductController from "../../../controllers/products/blend.product";
import { AuthMiddleware, RoleMiddleware } from "../../../middleware/auth";
import { BlendProductMiddleware } from "../../../middleware/products";

const router = Router();
