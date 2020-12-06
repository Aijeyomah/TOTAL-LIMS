import db from '../../db';
import query from '../../db/queries/product';
import Helper from '../../utils/helpers';
import ApiError from '../../utils/error/api.error';
import constants from '../../utils/constants';
import { productTestSchema, productSchema } from '../../validations/product';

const { PRODUCT_TEST_CONFLICT, ERROR_FETCHING_PRODUCT_TEST, PRODUCT_CONFLICT, ERROR_FETCHING_PRODUCT, ANALYSIS_SPEC_CONFLICT } = constants;
const { errorResponse } = Helper;
const { getProductTestByTest, getProductByProductName, checkIfTestBelongsToProduct } = query;

class ProductMiddleware {
  static async validateProductTestFields(req, res, next) {
    try {
      await productTestSchema.validateAsync(req.body);
      next();
    } catch (e) {
      const apiError = new ApiError({
        status: 400,
        message: e.details[0].message,
      });
      errorResponse(req, res, apiError);
    }
  }

  static async validateProductFields(req, res, next) {
    try {
      await productSchema.validateAsync(req.body);
      next();
    } catch (e) {
      const apiError = new ApiError({
        status: 400,
        message: e.details[0].message,
      });
      errorResponse(req, res, apiError);
    }
  }

  static async checkIfProductTest(req, res, next) {
    try {
      const { analysis } = req.body;
      const test = analysis.map(({ test }) => db.oneOrNone(getProductTestByTest, [test]));
      const result = await Promise.all(test);
      if (result[0]) {
        return errorResponse(
          req,
          res,
          new ApiError({ message: PRODUCT_TEST_CONFLICT, status: 409 })
        );
      }

      next();
    } catch (e) {
      e.status = ERROR_FETCHING_PRODUCT_TEST;
      Helper.moduleErrLogMessager(e);
      errorResponse(
        req,
        res,
        new ApiError({ message: ERROR_FETCHING_PRODUCT_TEST, status: 400, errors: e.message })
      );
    }
  }

  static async checkIfProductExist(req, res, next) {
    try {
      const { productName } = req.body;
      const product = await db.oneOrNone(getProductByProductName, [productName]);
      if (product) {
        return errorResponse(
          req,
          res,
          new ApiError({ message: PRODUCT_CONFLICT, status: 409 })
        );
      }
      next();
    } catch (e) {
      e.status = ERROR_FETCHING_PRODUCT;
      Helper.moduleErrLogMessager(e);
      errorResponse(
        req,
        res,
        new ApiError({ message: ERROR_FETCHING_PRODUCT, status: 400, errors: e.message })
      );
    }
  }

  static async checkIfSpecBelongToProduct(req, res, next) {
    try {
      const { id } = req.body;
      const productSpec = await db.oneOrNone(checkIfTestBelongsToProduct, [id]);
      if (!productSpec) {
        return errorResponse(
          req,
          res,
          new ApiError({ message: ANALYSIS_SPEC_CONFLICT, status: 409 })
        );
      }
      req.data = productSpec;
      next()
    } catch (e) {
      e.status = ERROR_FETCHING_PRODUCT;
      Helper.moduleErrLogMessager(e);
      errorResponse(
        req,
        res,
        new ApiError({ message: ERROR_FETCHING_PRODUCT, status: 400, errors: e.message })
      );
    }
  }
}

export default ProductMiddleware;
