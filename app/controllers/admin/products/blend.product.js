import { BlendProducts } from '../../../models';
import Helper from '../../../utils/helpers';
import constants from '../../../utils/constants';
import genericResponse from '../../../utils/error/generic';

const { successResponse, errorResponse } = Helper;
const { CREATE_BLEND_PRODUCT } = constants;

/**
 * a collection of methods that deals with blend products
 *
 * @class BlendProductController
 */
class BlendProductController {
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
      next(errorResponse(req, res, genericResponse.errorCreatingProduct));
    }
  }
}

export default BlendProductController;
