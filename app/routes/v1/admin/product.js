import { Router } from 'express';
import { AuthMiddleware, RoleMiddleware } from '../../../middleware/auth';
import { ProductMiddleware } from '../../../middleware/products';
import ProductController from '../../../controllers/admin/products';

const { roleValidator, roleAccessValidator } = RoleMiddleware;
const { validateProductTestFields, checkIfProductTest, checkIfProductExist, validateProductFields, validateProductSpecFields, checkIfSpecBelongToProduct } = ProductMiddleware;
const { productTest, product, getAllProductTest, getAllProduct, getAllCategory, editProductSpecification, deleteProduct, searchProducts } = ProductController;
const router = Router();

router.post(
  '/product-test',
  roleValidator,
  // validateProductTestFields,
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
  roleAccessValidator(["super", "staff"]),
  getAllProductTest
);

router.get(
  '/all/:categoryId',
  roleAccessValidator(["super", "staff"]),
  getAllProduct
);

router.get(
  '/categories',
  roleAccessValidator(["super", "staff"]),
  getAllCategory
);

router.put(
  '/edit/:productId',
  roleValidator,
  validateProductSpecFields,
  checkIfSpecBelongToProduct,
  editProductSpecification,
  
);

router.delete(
  '/:id',
  roleValidator,
  checkIfProductExist,
  deleteProduct
);

router.get(
  '/:category_id/product',
  roleAccessValidator(["super", "staff"]),
  checkIfProductExist,
  searchProducts
);

export default router;
