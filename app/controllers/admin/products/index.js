import  ProductTest from '../../../models/product.tests';
import Helper from '../../../utils/helpers';
import constants from '../../../utils/constants';
import { genericErrors } from '../../../utils';
import ProductTestModel from '../../../models/product.tests';
import ProductModel from '../../../models/product';

const { successResponse, errorResponse } = Helper;
const { CREATE_PRODUCT_TEST, CREATE_PRODUCT } = constants;

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
  };

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
      console.log(error);
      
      next(errorResponse(req, res, genericErrors.errorCreatingProduct));
    }
  }; 
}

export default ProductController;
