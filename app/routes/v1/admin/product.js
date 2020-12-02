import { Router } from "express";
import { AuthMiddleware, RoleMiddleware } from "../../../middleware/auth";
import { ProductMiddleware } from "../../../middleware/products";
import ProductController from '../../../controllers/admin/products';

const { roleValidator } = RoleMiddleware;
const { validateProductTestFields, checkIfProductTest, checkIfProductExist, validateProductFields } = ProductMiddleware;
const { productTest, product } = ProductController;
const router = Router();

router.post(
    '/product-test',
    roleValidator,
    //validateProductTestFields,
    checkIfProductTest,
    productTest
);

router.post(
    '/new-product',
    roleValidator,
    validateProductFields,
    checkIfProductExist,
    product
);


export default router;
