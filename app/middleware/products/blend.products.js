import db from '../../db';
import query from '../../db/queries/product/blend';
import Helper from '../../utils/helpers';
import ApiError from '../../utils/error/api.error';
import constants from '../../utils/constants'

const { PRODUCT_CONFLICT, ERROR_FETCHING_PRODUCT } = constants;
const { errorResponse } = Helper;
const { fetchBlendProductByProductName } = query;

class BlendProductMiddleware {
  static async checkIfProductExist(req, res, next) {
    try {
      const { product_name } = req.body;
      const product = await db.oneOrNone(fetchBlendProductByProductName, [product_name]);
      if (product) {
        return errorResponse(
          req,
          res,
          new ApiError({message: PRODUCT_CONFLICT,status: 409})
        );
      }
      next();
    } catch (e) {
      console.log(e);
      
        e.status = ERROR_FETCHING_PRODUCT;
        Helper.moduleErrLogMessager(e);
        errorResponse(
          req,
          res,
          new ApiError({ message: ERROR_FETCHING_PRODUCT , status: 400, errors: e.message})
        );
    }
  }
}

export default BlendProductMiddleware;
