import db from '../../db';
import query from '../../db/queries/product/blend';
import Helper from '../../utils/helpers';
import ApiError from '../../utils/error/api.error';
import constants from '../../utils/constants';
import { productResultSchema} from '../../validations/index';

const { PRODUCT_CONFLICT, ERROR_FETCHING_PRODUCT } = constants;
const { errorResponse } = Helper;
const { fetchBlendProductByProductName } = query;

class BlendProductMiddleware {

  static async validateProductResultFields(req, res, next) {
    try {
      await productResultSchema.validateAsync(req.body);
      next();
    } catch (e) {
        const apiError = new ApiError({
        status: 400,
        message: e.details[0].message,
      });
      errorResponse(req, res, apiError);
    }
  }
  static async checkIfProductExist(req, res, next) {
    try {
      const { product_name } = req.body;
      const product = await db.oneOrNone(fetchBlendProductByProductName, [product_name]);
      console.log('#######', product);
      
     
      if (product) {
        return errorResponse(
          req,
          res,
          new ApiError({message: PRODUCT_CONFLICT,status: 409})
        );
      }
      next();
    } catch (e) {
      
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
