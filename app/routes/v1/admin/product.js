import { Router } from 'express';
import { AuthMiddleware, RoleMiddleware } from '../../../middleware/auth';
import { ProductMiddleware } from '../../../middleware/products';
import ProductController from '../../../controllers/admin/products';

const { roleValidator } = RoleMiddleware;
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
  roleValidator,
  getAllProductTest
);

router.get(
  '/all/:categoryId',
  roleValidator,
  getAllProduct
);

router.get(
  '/categories',
  roleValidator,
  getAllCategory
);

router.put(
  '/categories/:productId',
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
  roleValidator,
  checkIfProductExist,
  searchProducts
);

export default router;
