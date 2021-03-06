import ProductTest from "../../../models/product.tests";
import Helper from "../../../utils/helpers";
import constants from "../../../utils/constants";
import { genericErrors } from "../../../utils";
import ProductTestModel from "../../../models/product.tests";
import ProductModel from "../../../models/product";
import ProductServices from "../../../services/products";

const {
  getAllProductCategory,
  getAllTest,
  editProductSpec,
  deleteProduct,
  searchProduct
} = ProductServices;
const { successResponse, errorResponse } = Helper;
const {
  CREATE_PRODUCT_TEST,
  CREATE_PRODUCT,
  FETCH_TEST_SUCCESSFULLY,
  FETCH_PRODUCTS_SUCCESSFULLY,
  FETCH_CATEGORIES_SUCCESSFULLY,
  UPDATE_PRODUCT_SPEC_SUCCESSFULLY,
  DELETE_PRODUCT_SUCCESSFULLY,
} = constants;

/**
 * a collection of methods that deals with  products
 *
 * @class ProductController
 */
class ProductController {
  /**

   * @static
   * @param {object} req - a request from an endpoint
   * @param {object} res - a response returned by the method
    @returns {JSON} - A JSON response with the product test info
   * @param {function} next - a function to call the next handler
   * @memberof ProductController
   */
  static async productTest(req, res, next) {
    try {
      const productTest = new ProductTestModel(req.body);
      const result = await productTest.save();
      return successResponse(res, {
        message: CREATE_PRODUCT_TEST,
        data: result,
        code: 201,
      });
    } catch (error) {
      next(errorResponse(req, res, genericErrors.errorCreatingProductTest));
    }
  }

  /**

   * @static
   * param {object} req - a request from an endpoint
   * @param {object} res - a response returned by the method
    @returns {JSON} - A JSON response with the product info
   * @param {function} next - a function to call the next handler
   * @memberof ProductController
   */
  static async product(req, res, next) {
    try {
      const product = new ProductModel(req.body);
      const result = await product.save();
      return successResponse(res, {
        message: CREATE_PRODUCT,
        data: result,
        code: 201,
      });
    } catch (error) {
      next(errorResponse(req, res, genericErrors.errorCreatingProduct));
    }
  }

  static async getAllProductTest(req, res, next) {
    try {
      const test = await getAllTest(req.params.categoryId);
      return successResponse(res, {
        message: FETCH_TEST_SUCCESSFULLY,
        data: test,
        code: 201,
      });
    } catch (e) {
      next(errorResponse(req, res, genericErrors.getProductError));
    }
  }

  static async getAllProduct(req, res, next) {
    try {
      const test = await ProductServices.getAllProduct(req.params.categoryId);
      return successResponse(res, {
        message: FETCH_PRODUCTS_SUCCESSFULLY,
        data: test,
        code: 201,
      });
    } catch (e) {
      next(errorResponse(req, res, genericErrors.getProductError));
    }
  }

  static async getAllCategory(req, res, next) {
    try {
      const test = await getAllProductCategory();
      return successResponse(res, {
        message: FETCH_CATEGORIES_SUCCESSFULLY,
        data: test,
        code: 201,
      });
    } catch (e) {
      next(errorResponse(req, res, genericErrors.getProductError));
    }
  }

  static async editProductSpecification(req, res, next) {
    try {
      const spec = await editProductSpec(req.body, req.params.productId);
      return successResponse(res, {
        message: UPDATE_PRODUCT_SPEC_SUCCESSFULLY,
        data: spec,
        code: 201,
      });
    } catch (e) {
      next(errorResponse(req, res, genericErrors.updateProductSpecError));
    }
  }

  static async deleteProduct(req, res, next) {
    try {
      await deleteProduct(req.params.id);
      return successResponse(res, {
        message: DELETE_PRODUCT_SUCCESSFULLY,
        code: 201,
      });
    } catch (e) {
      next(errorResponse(req, res, genericErrors.deleteProduct));
    }
  };
  
  static async searchProducts(req, res, next) {
    try {
      const { product_name, created_at } = req.query;
      const { category_id } = req.params;
     const product =  await searchProduct(category_id, product_name, created_at);
     
      return successResponse(res, {
        message: FETCH_PRODUCTS_SUCCESSFULLY,
        data: product,
        code: 201,
      });
    } catch (e) {
      next(errorResponse(req, res, genericErrors.getProductError));
    }
  };
}

export default ProductController;
