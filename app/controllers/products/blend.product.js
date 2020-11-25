import BlendProductService from "../../services/products/blend.products";
import { ApiError, Helper, constants, genericErrors, } from "../../utils";
import genericResponse from "../../utils/error/generic";
import BlendProductResult from "../../models/blend.product.result";

const { getAllBlendProduct } = BlendProductService;
const { successResponse, errorResponse } = Helper;
const { FETCH_PRODUCTS_SUCCESSFULLY, SAVE_PRODUCT_RESULT_SUCCESSFULLY} = constants;
class BlendProductController {
  
  /**
   * save product analysis result.
   *
   * @static
   * @param {Request} req - The request from the endpoint.
   * @param {Response} res - The response returned by the method.
   * @param { Function } next - The next function provided by express.
   * @returns { JSON } A JSON response with a product name if successful
   * @memberof BlendProductController
   */
  static async blendProductResult(req, res, next) {
    try {
      const product = new BlendProductResult(req.body);
      const { product_name } = await product.save();
      return successResponse(res, {
        data: { product_name },
        message: SAVE_PRODUCT_RESULT_SUCCESSFULLY ,
        code: 201
      });
    } catch (e) {
      next(errorResponse(req, res, genericErrors.errorSavingProductResult)); 
    }
  };

  /**
   * get all  product.
   *
   * @static
   * @param {Request} req - The request from the endpoint.
   * @param {Response} res - The response returned by the method.
   * @param { Function } next - The next function provided by express.
   * @returns { JSON } A JSON response with a product object if successful
   * @memberof BlendProductController
   */
  static async fetchBlendProduct(req, res, next) {
    try {
      const products = await getAllBlendProduct();
      successResponse(res, {
        data: products,
        message: FETCH_PRODUCTS_SUCCESSFULLY,
      });
    } catch (error) {
      next(errorResponse(req, res, genericResponse.getProductError));
    }
  }

  
}
export default BlendProductController;
