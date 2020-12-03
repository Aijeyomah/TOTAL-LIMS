import { Router } from "express";
import { AuthMiddleware, RoleMiddleware } from "../../../middleware/auth";
import { ProductMiddleware } from "../../../middleware/products";
import ProductController from '../../../controllers/admin/products';

const { roleValidator, roleAccessValidator } = RoleMiddleware;
const { validateProductTestFields, checkIfProductTest, checkIfProductExist, validateProductFields } = ProductMiddleware;
const { productTest, product , getAllProductTest, getAllProduct} = ProductController;
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

router.get(
    '/test/:categoryId',
    roleValidator,
    getAllProductTest
); 

router.get(
    '/all',
    roleValidator,
    getAllProduct
);




export default router;
