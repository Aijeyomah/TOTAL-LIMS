import { BlendProducts } from '../../../models';
import Helper from '../../../utils/helpers';
import constants from '../../../utils/constants';
import genericResponse from '../../../utils/error/generic';
import BlendProductService from "../../../services/products/blend.products";

const {  updateByIdProduct, deleteProductById } = BlendProductService;
const { successResponse, errorResponse } = Helper;
const { CREATE_BLEND_PRODUCT, FETCH_PRODUCTS_SUCCESSFULLY , DELETE_PRODUCT_SUCCESSFULLY, UPDATE_PRODUCT_SUCCESSFULLY} = constants;

/**
 * a collection of methods that deals with blend products
 *
 * @class BlendProductController
 */
class ProductController {
  /**

   * @static
   * @param {object} req - a request from an endpoint
   * @param {object} res - a response returned by the method
    @returns {JSON} - A JSON response with the user's details and a JWT or an
   * error response is request body doesn't match with db
   * @param {function} next - a function to call the next handler
   * @memberof BlendProductController
   */
  static async blendProduct(req, res, next) {
    try {
      const blendProduct = new BlendProducts(req.body);
      const { product_name } = await blendProduct.save();
      return successResponse(res, {
        message: CREATE_BLEND_PRODUCT,
        data: { product_name },
        code: 201,
      });
    } catch (error) {
      console.log(error);

      next(errorResponse(req, res, genericResponse.errorCreatingProduct));
    }
  }

  /**
   * update a specific product.
   *
   * @static
   * @param {Request} req - The request from the endpoint.
   * @param {Response} res - The response returned by the method.
   * @param { Function } next - The next function provided by express.
   * @returns { JSON } A JSON response with a message object
   * @memberof BlendProductController
   */
  static async updateProductById(req, res, next) {
    try {
      const data = await updateByIdProduct(req.params, req.body);
      successResponse(res, {
        data,
        message: UPDATE_PRODUCT_SUCCESSFULLY
      });
    } catch (e) {
      next(errorResponse(req, res, genericResponse.updateProductError));
    }
  }

  /**
   * delete a specific product.
   *
   * @static
   * @param {Request} req - The request from the endpoint.
   * @param {Response} res - The response returned by the method.
   * @param { Function } next - The next function provided by express.
   * @returns { JSON } A JSON response with a message object
   * @memberof BlendProductController
   */
  static async deleteBlendProductById(req, res, next) {
    try {
      const data = await deleteProductById(req.params.id);
      successResponse(res, {
        data,
        message: DELETE_PRODUCT_SUCCESSFULLY
      });
    } catch (e) {
      next(errorResponse(req, res, genericErrors.updateProductError));
    }
  }
}

export default ProductController;
